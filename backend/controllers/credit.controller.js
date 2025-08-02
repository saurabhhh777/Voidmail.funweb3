import User from '../models/user.model.js';
import CreditPurchase from '../models/creditPurchase.model.js';
import { verifySolanaTransaction } from '../services/solana.service.js';

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
        const transactionDetails = await verifySolanaTransaction(transactionHash);
        
        if (!transactionDetails.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid transaction'
            });
        }

        // Validate payment amount
        const expectedAmount = getExpectedAmount(credits);
        if (transactionDetails.amount !== expectedAmount) {
            return res.status(400).json({
                success: false,
                message: 'Payment amount mismatch'
            });
        }

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