import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AnchorProvider, Program, Wallet, utils } from '@coral-xyz/anchor';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');

// Load the IDL
const IDL_PATH = path.join(__dirname, '../abi/voidmail_nft.json');
const IDL = JSON.parse(readFileSync(IDL_PATH, 'utf8'));

// Program ID
const PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9');

export const verifySolanaTransaction = async (transactionHash, expectedCredits = null) => {
    try {
        console.log('=== VERIFYING TRANSACTION ===');
        console.log('Transaction hash:', transactionHash);
        console.log('Expected credits:', expectedCredits);
        
        const transaction = await connection.getTransaction(transactionHash, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
        });

        if (!transaction) {
            console.log('Transaction not found');
            return { success: false, message: 'Transaction not found' };
        }

        // Verify transaction is confirmed
        if (!transaction.meta || transaction.meta.err) {
            console.log('Transaction failed:', transaction.meta?.err);
            return { success: false, message: 'Transaction failed' };
        }

        console.log('Transaction confirmed successfully');

        // Check if transaction involves our program
        const programLogs = transaction.meta.logMessages || [];
        console.log('Program logs:', programLogs);
        
        const hasProgramLog = programLogs.some(log => 
            log.includes(PROGRAM_ID.toString()) && 
            (log.includes('Credits purchased') || log.includes('Custom Email Minted'))
        );

        if (!hasProgramLog) {
            console.log('Transaction not from our program');
            return { success: false, message: 'Transaction not from our program' };
        }

        console.log('Transaction involves our program');

        // Find the vault PDA
        const [vaultPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("vault")],
            PROGRAM_ID
        );

        console.log('Vault PDA:', vaultPda.toString());

        // Get account keys from transaction
        const accountKeys = transaction.transaction.message.accountKeys;
        const vaultIndex = accountKeys.findIndex(key => key.toString() === vaultPda.toString());
        
        if (vaultIndex === -1) {
            console.log('Vault account not found in transaction');
            return { success: false, message: 'Vault account not found in transaction' };
        }

        console.log('Vault account found at index:', vaultIndex);

        // Find the user account (payer)
        const userAccount = transaction.transaction.message.accountKeys[0];
        const userIndex = 0; // First account is always the payer

        console.log('User account:', userAccount.toString());

        // Calculate balance changes
        const preBalances = transaction.meta.preBalances;
        const postBalances = transaction.meta.postBalances;
        const fee = transaction.meta.fee;

        // Calculate user's SOL transfer (amount sent to vault)
        const userBalanceChange = preBalances[userIndex] - postBalances[userIndex] - fee;
        const userAmountSent = Math.abs(userBalanceChange);

        // Calculate vault's SOL received
        const vaultBalanceChange = postBalances[vaultIndex] - preBalances[vaultIndex];
        const vaultAmountReceived = Math.abs(vaultBalanceChange);

        console.log('Balance changes:', {
            userAmountSent,
            vaultAmountReceived,
            fee
        });

        // Verify the amounts match (user sent = vault received)
        if (userAmountSent !== vaultAmountReceived) {
            console.log('Amount mismatch detected');
            return { 
                success: false, 
                message: `Amount mismatch: User sent ${userAmountSent} lamports, Vault received ${vaultAmountReceived} lamports` 
            };
        }

        // If expected credits provided, verify the amount is correct
        if (expectedCredits) {
            const expectedAmount = getExpectedAmountForCredits(expectedCredits);
            console.log('Expected amount for credits:', expectedAmount);
            
            if (userAmountSent !== expectedAmount) {
                console.log('Incorrect payment amount');
                return { 
                    success: false, 
                    message: `Incorrect payment amount: Expected ${expectedAmount} lamports for ${expectedCredits} credits, but received ${userAmountSent} lamports` 
                };
            }
        }

        // Extract credits from program logs if available
        let actualCredits = null;
        for (const log of programLogs) {
            if (log.includes('Credits purchased:')) {
                const match = log.match(/Credits purchased:\s*(\d+)/);
                if (match) {
                    actualCredits = parseInt(match[1]);
                    break;
                }
            }
        }

        console.log('Credits from logs:', actualCredits);

        // If we found credits in logs and expected credits provided, verify they match
        if (actualCredits && expectedCredits && actualCredits !== expectedCredits) {
            console.log('Credits mismatch');
            return { 
                success: false, 
                message: `Credits mismatch: Expected ${expectedCredits} credits, but transaction shows ${actualCredits} credits` 
            };
        }

        console.log('=== TRANSACTION VERIFICATION SUCCESSFUL ===');

        return {
            success: true,
            amount: userAmountSent,
            user: userAccount.toString(),
            vault: vaultPda.toString(),
            credits: actualCredits || expectedCredits,
            blockTime: transaction.blockTime,
            transactionHash
        };

    } catch (error) {
        console.error('=== TRANSACTION VERIFICATION FAILED ===');
        console.error('Error verifying Solana transaction:', error);
        return { success: false, message: 'Error verifying transaction' };
    }
};

// Helper function to get expected amount for credits
function getExpectedAmountForCredits(credits) {
    const pricing = {
        1: 25000000,  // 0.025 SOL
        2: 45000000,  // 0.045 SOL
        3: 60000000,  // 0.060 SOL
        5: 90000000,  // 0.090 SOL
        10: 150000000 // 0.150 SOL
    };
    return pricing[credits] || 0;
}

// Verify smart contract instruction data
export const verifySmartContractInstruction = async (transactionHash, expectedCredits) => {
    try {
        console.log('=== VERIFYING SMART CONTRACT INSTRUCTION ===');
        console.log('Transaction hash:', transactionHash);
        console.log('Expected credits:', expectedCredits);
        
        const transaction = await connection.getTransaction(transactionHash, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
        });

        if (!transaction) {
            console.log('Transaction not found');
            return { success: false, message: 'Transaction not found' };
        }

        console.log('Transaction found, checking instructions...');

        // Check if our program is involved in any instruction
        const instructions = transaction.transaction.message.instructions;
        const accountKeys = transaction.transaction.message.accountKeys;

        console.log('Number of instructions:', instructions.length);

        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            const programKey = accountKeys[instruction.programIdIndex];

            console.log(`Instruction ${i}:`, {
                programKey: programKey.toString(),
                ourProgram: PROGRAM_ID.toString(),
                matches: programKey.toString() === PROGRAM_ID.toString()
            });

            if (programKey.toString() === PROGRAM_ID.toString()) {
                console.log('Found our program instruction!');
                
                // This is our program instruction
                const instructionData = instruction.data;
                console.log('Instruction data length:', instructionData.length);
                
                // The first 8 bytes is the instruction discriminator
                const discriminator = instructionData.slice(0, 8);
                console.log('Discriminator:', discriminator.toString('hex'));
                
                // Generate the expected discriminator for purchaseCredits
                const purchaseCreditsDiscriminator = utils.instructionDiscriminator('purchaseCredits');
                console.log('Expected discriminator for purchaseCredits:', purchaseCreditsDiscriminator.toString('hex'));
                
                // Check if this is a purchaseCredits instruction
                if (discriminator.equals(purchaseCreditsDiscriminator)) {
                    console.log('This is a purchaseCredits instruction!');
                    
                    // Extract credits from instruction data (u8 after discriminator)
                    if (instructionData.length >= 9) { // 8 bytes discriminator + 1 byte for credits (u8)
                        const creditsBuffer = instructionData.slice(8, 9);
                        const actualCredits = creditsBuffer.readUInt8(0);
                        
                        console.log('Credits from instruction data:', actualCredits);
                        
                        if (actualCredits === expectedCredits) {
                            console.log('Credits match!');
                            return {
                                success: true,
                                credits: actualCredits,
                                instructionIndex: i
                            };
                        } else {
                            console.log('Credits mismatch!');
                            return {
                                success: false,
                                message: `Instruction data shows ${actualCredits} credits, expected ${expectedCredits}`
                            };
                        }
                    } else {
                        console.log('Instruction data too short');
                        return {
                            success: false,
                            message: 'Instruction data too short to extract credits'
                        };
                    }
                } else {
                    console.log('This is not a purchaseCredits instruction');
                }
            }
        }

        console.log('No valid program instruction found');
        return { success: false, message: 'No valid program instruction found' };

    } catch (error) {
        console.error('=== INSTRUCTION VERIFICATION FAILED ===');
        console.error('Error verifying smart contract instruction:', error);
        return { success: false, message: 'Error verifying instruction data' };
    }
};

export const getSolanaBalance = async (walletAddress) => {
    try {
        const publicKey = new PublicKey(walletAddress);
        const balance = await connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL;
    } catch (error) {
        console.error('Error getting Solana balance:', error);
        throw error;
    }
};

class SolanaService {
  constructor() {
    // Only create provider if ADMIN_WALLET_PUBKEY is provided
    if (process.env.ADMIN_WALLET_PUBKEY) {
      this.provider = new AnchorProvider(
        this.connection,
        new Wallet(new PublicKey(process.env.ADMIN_WALLET_PUBKEY)),
        { commitment: 'confirmed' }
      );
    } else {
      this.provider = null;
    }
  }

  // Create bounty on-chain (optional)
  async createBountyOnChain(bountyData) {
    try {
      // This would integrate with your Anchor program
      // For now, we'll just return a mock transaction hash
      const mockTxHash = 'mock_transaction_hash_' + Date.now();
      
      return {
        success: true,
        transactionHash: mockTxHash,
        message: 'Bounty created on-chain successfully'
      };
    } catch (error) {
      console.error('Error creating bounty on-chain:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Reward user on-chain (optional)
  async rewardUserOnChain(walletAddress, amount, bountyId) {
    try {
      // This would integrate with your Anchor program
      // For now, we'll just return a mock transaction hash
      const mockTxHash = 'mock_reward_tx_' + Date.now();
      
      return {
        success: true,
        transactionHash: mockTxHash,
        message: 'Reward sent on-chain successfully'
      };
    } catch (error) {
      console.error('Error rewarding user on-chain:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verify wallet signature
  async verifyWalletSignature(message, signature, publicKey) {
    try {
      // This would verify the signature using Solana's native methods
      // For now, we'll return true as a placeholder
      return {
        success: true,
        isValid: true
      };
    } catch (error) {
      console.error('Error verifying wallet signature:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get wallet balance
  async getWalletBalance(walletAddress) {
    try {
      const publicKey = new PublicKey(walletAddress);
      const balance = await this.connection.getBalance(publicKey);
      
      return {
        success: true,
        balance: balance / LAMPORTS_PER_SOL, // Convert lamports to SOL
        lamports: balance
      };
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Transfer SOL (for rewards)
  async transferSOL(fromWallet, toWallet, amount) {
    try {
      const fromPublicKey = new PublicKey(fromWallet);
      const toPublicKey = new PublicKey(toWallet);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports: amount * LAMPORTS_PER_SOL
        })
      );

      // This would require the sender's private key
      // For now, we'll return a mock transaction
      const mockTxHash = 'mock_transfer_tx_' + Date.now();
      
      return {
        success: true,
        transactionHash: mockTxHash,
        message: 'SOL transferred successfully'
      };
    } catch (error) {
      console.error('Error transferring SOL:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new SolanaService(); 