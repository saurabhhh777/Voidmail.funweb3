import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');

// Get Solana transaction history for a wallet
export const getTransactionHistory = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const userWalletAddress = req.walletAddress;

        if (walletAddress !== userWalletAddress) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const publicKey = new PublicKey(walletAddress);
        
        // Get recent transactions
        const signatures = await connection.getSignaturesForAddress(publicKey, {
            limit: 20
        });

        // Get detailed transaction information
        const transactions = await Promise.all(
            signatures.map(async (sig) => {
                try {
                    const tx = await connection.getTransaction(sig.signature, {
                        commitment: 'confirmed',
                        maxSupportedTransactionVersion: 0
                    });

                    if (!tx) return null;

                    // Calculate SOL amount transferred
                    let amount = 0;
                    let type = 'Transfer';

                    if (tx.meta && tx.transaction) {
                        const preBalances = tx.meta.preBalances;
                        const postBalances = tx.meta.postBalances;
                        const fee = tx.meta.fee;

                        // Find the user's account index
                        const userIndex = tx.transaction.message.accountKeys.findIndex(
                            key => key.toString() === walletAddress
                        );

                        if (userIndex !== -1) {
                            const balanceChange = preBalances[userIndex] - postBalances[userIndex] - fee;
                            amount = Math.abs(balanceChange);
                            
                            // Determine transaction type
                            if (balanceChange > 0) {
                                type = 'Received';
                            } else if (balanceChange < 0) {
                                type = 'Sent';
                            }
                        }

                        // Check if it's a program interaction
                        if (tx.meta.logMessages) {
                            const logs = tx.meta.logMessages.join(' ');
                            if (logs.includes('Credits purchased')) {
                                type = 'Credit Purchase';
                            } else if (logs.includes('Custom Email Minted')) {
                                type = 'Email Creation';
                            }
                        }
                    }

                    return {
                        signature: sig.signature,
                        timestamp: sig.blockTime ? new Date(sig.blockTime * 1000) : new Date(),
                        amount,
                        type,
                        status: tx?.meta?.err ? 'failed' : 'confirmed',
                        fee: tx?.meta?.fee || 0
                    };
                } catch (error) {
                    console.error('Error fetching transaction:', error);
                    return null;
                }
            })
        );

        // Filter out null transactions and sort by timestamp
        const validTransactions = transactions
            .filter(tx => tx !== null)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return res.status(200).json({
            success: true,
            data: validTransactions
        });

    } catch (error) {
        console.error('Error in getTransactionHistory:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get transaction statistics
export const getTransactionStats = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const userWalletAddress = req.walletAddress;

        if (walletAddress !== userWalletAddress) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const publicKey = new PublicKey(walletAddress);
        
        // Get recent transactions for stats
        const signatures = await connection.getSignaturesForAddress(publicKey, {
            limit: 100
        });

        let totalSent = 0;
        let totalReceived = 0;
        let totalFees = 0;
        let creditPurchases = 0;
        let emailCreations = 0;

        // Process transactions for statistics
        for (const sig of signatures) {
            try {
                const tx = await connection.getTransaction(sig.signature, {
                    commitment: 'confirmed',
                    maxSupportedTransactionVersion: 0
                });

                if (!tx || tx.meta?.err) continue;

                const fee = tx.meta.fee || 0;
                totalFees += fee;

                // Calculate amounts and types
                if (tx.meta && tx.transaction) {
                    const preBalances = tx.meta.preBalances;
                    const postBalances = tx.meta.postBalances;
                    
                    const userIndex = tx.transaction.message.accountKeys.findIndex(
                        key => key.toString() === walletAddress
                    );

                    if (userIndex !== -1) {
                        const balanceChange = preBalances[userIndex] - postBalances[userIndex] - fee;
                        
                        if (balanceChange > 0) {
                            totalReceived += Math.abs(balanceChange);
                        } else if (balanceChange < 0) {
                            totalSent += Math.abs(balanceChange);
                        }
                    }

                    // Count specific transaction types
                    if (tx.meta.logMessages) {
                        const logs = tx.meta.logMessages.join(' ');
                        if (logs.includes('Credits purchased')) {
                            creditPurchases++;
                        } else if (logs.includes('Custom Email Minted')) {
                            emailCreations++;
                        }
                    }
                }
            } catch (error) {
                console.error('Error processing transaction for stats:', error);
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                totalSent: totalSent / 1000000000, // Convert to SOL
                totalReceived: totalReceived / 1000000000,
                totalFees: totalFees / 1000000000,
                creditPurchases,
                emailCreations,
                totalTransactions: signatures.length
            }
        });

    } catch (error) {
        console.error('Error in getTransactionStats:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
