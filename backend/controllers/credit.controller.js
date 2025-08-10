import User from '../models/user.model.js';
import CreditPurchase from '../models/creditPurchase.model.js';
import { verifySolanaTransaction, verifySmartContractInstruction } from '../services/solana.service.js';
import { Connection, PublicKey } from '@solana/web3.js';
import { readFileSync } from 'fs';
import path from 'path';

// Process credit purchase from frontend
export const processCreditPurchase = async (req, res) => {
    try {
        const { credits, walletAddress } = req.body;
        const userWalletAddress = req.walletAddress;

        // Validate user is purchasing for their own wallet
        if (walletAddress !== userWalletAddress) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized: Can only purchase credits for your own wallet'
            });
        }

        if (!credits) {
            return res.status(400).json({
                success: false,
                message: 'Credits amount is required'
            });
        }

        // Validate credits amount
        const validCredits = [1, 2, 3, 5, 10];
        if (!validCredits.includes(credits)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credits amount. Must be 1, 2, 3, 5, or 10'
            });
        }

        // Get expected payment amount
        const expectedAmount = getExpectedAmount(credits);
        const expectedSol = expectedAmount / 1000000000; // Convert lamports to SOL

        // Return payment details for frontend to process
        return res.status(200).json({
            success: true,
            message: 'Payment details retrieved successfully',
            data: {
                credits,
                expectedAmount, // in lamports
                expectedSol,    // in SOL
                walletAddress,
                programId: process.env.PROGRAM_ID || '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9'
            }
        });

    } catch (error) {
        console.error('Error in processCreditPurchase:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get credit pricing
export const getCreditPricing = async (req, res) => {
    try {
        const pricing = [
            { credits: 1, price: 0.025, solAmount: 25000000 },
            { credits: 2, price: 0.045, solAmount: 45000000 },
            { credits: 3, price: 0.060, solAmount: 60000000 },
            { credits: 5, price: 0.090, solAmount: 90000000 },
            { credits: 10, price: 0.150, solAmount: 150000000 }
        ];

        return res.status(200).json({
            success: true,
            data: pricing
        });
    } catch (error) {
        console.error('Error in getCreditPricing:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get credit transaction history
export const getCreditTransactions = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const userWalletAddress = req.walletAddress;

        if (walletAddress !== userWalletAddress) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const transactions = await CreditPurchase.find({ wallet: walletAddress })
            .sort({ createdAt: -1 })
            .limit(50);

        return res.status(200).json({
            success: true,
            data: transactions
        });

    } catch (error) {
        console.error('Error in getCreditTransactions:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Verify and process credit purchase
export const verifyCreditPurchase = async (req, res) => {
    try {
        const { transactionHash, credits, walletAddress } = req.body;

        if (!transactionHash || !credits || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Transaction hash, credits, and wallet address are required'
            });
        }

        // Validate credits amount
        const validCredits = [1, 2, 3, 5, 10];
        if (!validCredits.includes(credits)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credits amount'
            });
        }

        // Check if transaction already processed
        const existingPurchase = await CreditPurchase.findOne({ transactionHash });
        if (existingPurchase) {
            return res.status(409).json({
                success: false,
                message: 'Transaction already processed'
            });
        }

        // Verify transaction on Solana
        console.log('=== CREDIT PURCHASE VERIFICATION ===');
        console.log('Verifying transaction:', transactionHash);
        console.log('Expected credits:', credits);
        
        const transactionDetails = await verifySolanaTransaction(transactionHash, credits);
        
        if (!transactionDetails.success) {
            console.log('Transaction verification failed:', transactionDetails.message);
            return res.status(400).json({
                success: false,
                message: transactionDetails.message || 'Invalid transaction'
            });
        }

        console.log('Transaction verification successful');

        // Additional verification using instruction data
        console.log('Verifying instruction data...');
        const instructionVerification = await verifySmartContractInstruction(transactionHash, credits);
        
        if (!instructionVerification.success) {
            console.log('Instruction verification failed:', instructionVerification.message);
            return res.status(400).json({
                success: false,
                message: `Instruction verification failed: ${instructionVerification.message}`
            });
        }

        console.log('Instruction verification successful');

        // Validate payment amount (double-check with our expected amount)
        const expectedAmount = getExpectedAmount(credits);
        if (transactionDetails.amount !== expectedAmount) {
            console.log('Payment amount mismatch');
            return res.status(400).json({
                success: false,
                message: `Payment amount mismatch: Expected ${expectedAmount} lamports for ${credits} credits, but received ${transactionDetails.amount} lamports`
            });
        }

        // Validate credits amount from transaction
        if (transactionDetails.credits !== credits) {
            console.log('Credits mismatch');
            return res.status(400).json({
                success: false,
                message: `Credits mismatch: Expected ${credits} credits, but transaction shows ${transactionDetails.credits} credits`
            });
        }

        console.log('All verifications passed, creating credit purchase record...');

        // Create credit purchase record
        const creditPurchase = new CreditPurchase({
            wallet: walletAddress,
            credits,
            amount: expectedAmount,
            transactionHash,
            solAmount: expectedAmount,
            status: 'completed'
        });

        await creditPurchase.save();

        // Update user credits
        const user = await User.findOneAndUpdate(
            { wallet: walletAddress },
            { $inc: { credits: credits } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Credits purchased successfully',
            data: {
                credits: user.credits,
                purchasedCredits: credits
            }
        });

    } catch (error) {
        console.error('Error in verifyCreditPurchase:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get user credits
export const getUserCredits = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const userWalletAddress = req.walletAddress;

        if (walletAddress !== userWalletAddress) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const user = await User.findOne({ wallet: walletAddress });
        
        if (!user) {
            return res.status(200).json({
                success: true,
                data: { credits: 0 }
            });
        }

        return res.status(200).json({
            success: true,
            data: { credits: user.credits }
        });

    } catch (error) {
        console.error('Error in getUserCredits:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Test smart contract connection
export const testSmartContractConnection = async (req, res) => {
    try {
        console.log('=== TESTING SMART CONTRACT CONNECTION ===');
        
        // Test IDL loading
        const IDL_PATH = path.join(process.cwd(), 'abi/voidmail_nft.json');
        console.log('IDL path:', IDL_PATH);
        
        try {
            const IDL = JSON.parse(readFileSync(IDL_PATH, 'utf8'));
            console.log('IDL loaded successfully');
            console.log('IDL instructions:', IDL.instructions.map(inst => inst.name));
        } catch (idlError) {
            console.error('Error loading IDL:', idlError);
            return res.status(500).json({
                success: false,
                message: 'Failed to load IDL: ' + idlError.message
            });
        }

        // Test connection to Solana
        const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');
        console.log('Solana RPC URL:', process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');
        
        try {
            const slot = await connection.getSlot();
            console.log('Connected to Solana, current slot:', slot);
        } catch (connectionError) {
            console.error('Error connecting to Solana:', connectionError);
            return res.status(500).json({
                success: false,
                message: 'Failed to connect to Solana: ' + connectionError.message
            });
        }

        // Test program ID
        const programId = new PublicKey(process.env.PROGRAM_ID || '9kuRSh73N6BU8g5qtrcik6RP67YvdrDXE6ZpiM9gvSw9');
        console.log('Program ID:', programId.toString());
        
        try {
            const programInfo = await connection.getAccountInfo(programId);
            if (programInfo) {
                console.log('Program found on-chain');
            } else {
                console.log('Program not found on-chain');
            }
        } catch (programError) {
            console.error('Error checking program:', programError);
        }

        console.log('=== SMART CONTRACT CONNECTION TEST COMPLETED ===');

        return res.status(200).json({
            success: true,
            message: 'Smart contract connection test completed successfully',
            data: {
                idlLoaded: true,
                solanaConnected: true,
                programId: programId.toString(),
                rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com'
            }
        });

    } catch (error) {
        console.error('Error in testSmartContractConnection:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
};

// Helper function to get expected amount for credits
function getExpectedAmount(credits) {
    const pricing = {
        1: 25000000,  // 0.025 SOL
        2: 45000000,  // 0.045 SOL
        3: 60000000,  // 0.060 SOL
        5: 90000000,  // 0.090 SOL
        10: 150000000 // 0.150 SOL
    };
    return pricing[credits] || 0;
} 