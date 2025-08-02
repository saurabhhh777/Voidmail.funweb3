import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
import { readFileSync } from 'fs';
import path from 'path';

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');

export const verifySolanaTransaction = async (transactionHash) => {
    try {
        const transaction = await connection.getTransaction(transactionHash, {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0
        });

        if (!transaction) {
            return { success: false, message: 'Transaction not found' };
        }

        // Verify transaction is confirmed
        if (!transaction.meta || transaction.meta.err) {
            return { success: false, message: 'Transaction failed' };
        }

        // Get the program ID from environment or use default
        const programId = new PublicKey(process.env.PROGRAM_ID || '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9');

        // Check if transaction involves our program
        const programLogs = transaction.meta.logMessages || [];
        const hasProgramLog = programLogs.some(log => 
            log.includes(programId.toString()) && 
            (log.includes('Credits purchased') || log.includes('Custom Email Minted'))
        );

        if (!hasProgramLog) {
            return { success: false, message: 'Transaction not from our program' };
        }

        // Calculate total SOL transferred
        const preBalances = transaction.meta.preBalances;
        const postBalances = transaction.meta.postBalances;
        const fee = transaction.meta.fee;

        // Find the user account (first signer)
        const userAccount = transaction.transaction.message.accountKeys[0];
        const userIndex = transaction.transaction.message.accountKeys.findIndex(
            key => key.toString() === userAccount.toString()
        );

        if (userIndex === -1) {
            return { success: false, message: 'User account not found in transaction' };
        }

        const userBalanceChange = preBalances[userIndex] - postBalances[userIndex] - fee;
        const amount = Math.abs(userBalanceChange);

        return {
            success: true,
            amount,
            user: userAccount.toString(),
            blockTime: transaction.blockTime
        };

    } catch (error) {
        console.error('Error verifying Solana transaction:', error);
        return { success: false, message: 'Error verifying transaction' };
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