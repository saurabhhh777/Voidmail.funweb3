import UserSession from '../models/userSession.model.js';
import User from '../models/user.model.js';
import crypto from 'crypto';

// Create user session with wallet authentication
export const createUserSession = async (req, res) => {
    try {
        const { walletAddress } = req.body;
        
        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'Wallet address is required'
            });
        }

        // Generate secure session token
        const alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 32;
        const randomBytes = crypto.randomBytes(length / 2).toString('hex');
        const randomString = Array.from({ length }, () => alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)]).join('');
        const token = randomBytes + randomString;

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Create or update user
        let user = await User.findOne({ wallet: walletAddress });
        if (!user) {
            user = await User.create({ wallet: walletAddress });
        }

        // Create session
        const session = await UserSession.create({
            sessionId: token,
            walletAddress,
            expiresAt
        });

        // Set secure cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(201).json({
            success: true,
            message: 'Session created successfully',
            data: {
                token,
                expiresAt,
                walletAddress,
                user: {
                    wallet: user.wallet,
                    isPremium: user.isPremium,
                    customEmail: user.customEmail
                }
            }
        });

    } catch (error) {
        console.error('Error in createUserSession:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const walletAddress = req.walletAddress;
        
        const user = await User.findOne({ wallet: walletAddress });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Logout user
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies?.token || req.header('x-session-token');
        
        if (token) {
            // Deactivate session
            await UserSession.findOneAndUpdate(
                { sessionId: token },
                { isActive: false }
            );
        }

        // Clear cookie
        res.clearCookie('token');

        return res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Error in logoutUser:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Create temporary email (keeping existing functionality)
export const createEmail = async (req, res) => {
    try {
        const token = req.cookies?.token || req.body?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No session found. Please create a session first.'
            });
        }

        const userSession = await UserSession.findOne({ sessionId: token });
        if (!userSession) {
            return res.status(401).json({
                success: false,
                message: 'Invalid session. Please create a new session.'
            });
        }

        const domains = ["asksaurabh.xyz", "bigtimer.site","voidmail.fun","voidmail.info","voidmail.online","voidmail.shop"];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const prefix = crypto.randomBytes(4).toString('hex');
        const email = `${prefix}@${domain}`;

        userSession.email = email;
        await userSession.save();

        return res.status(201).json({
            success: true,
            message: 'Email created successfully',
            data: { email }
        });
    } catch (error) {
        console.error('Error in createEmail:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Create custom email with credit system
export const createCustomEmail = async (req, res) => {
    try {
        const { prefix, domain } = req.body;
        const userWalletAddress = req.walletAddress;

        if (!prefix || !domain) {
            return res.status(400).json({
                success: false,
                message: 'Prefix and domain are required'
            });
        }

        // Validate domain
        const validDomains = ['voidmail.fun', 'voidmail.email', 'bigtimer.site', 'asksaurabh.xyz'];
        if (!validDomains.includes(domain)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid domain selected'
            });
        }

        // Check if user has enough credits
        const user = await User.findOne({ wallet: userWalletAddress });
        if (!user || user.credits < 1) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient credits. Please purchase credits first.'
            });
        }

        // Check if email is available
        const email = `${prefix}@${domain}`;
        const existingUser = await User.findOne({ customEmail: email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email address already taken'
            });
        }

        // Generate NFT mint address
        const nftMint = crypto.randomBytes(32).toString('hex');

        // Update user with custom email and deduct credits
        const updatedUser = await User.findOneAndUpdate(
            { wallet: userWalletAddress },
            { 
                $inc: { credits: -1 },
                customEmail: email,
                nftMint: nftMint,
                isPremium: true
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Custom email created successfully',
            data: {
                email,
                nftMint,
                walletAddress: userWalletAddress,
                remainingCredits: updatedUser.credits
            }
        });

    } catch (error) {
        console.error('Error in createCustomEmail:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get user's custom emails
export const getCustomEmails = async (req, res) => {
    try {
        const walletAddress = req.walletAddress;
        
        const user = await User.findOne({ wallet: walletAddress });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const customEmails = [];
        if (user.customEmail) {
            customEmails.push({
                email: user.customEmail,
                nftMint: user.nftMint,
                createdAt: user.createdAt
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Custom emails retrieved successfully',
            data: customEmails
        });

    } catch (error) {
        console.error('Error in getCustomEmails:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Check email availability
export const checkEmailAvailability = async (req, res) => {
    try {
        const { prefix, domain } = req.body;

        if (!prefix || !domain) {
            return res.status(400).json({
                success: false,
                message: 'Prefix and domain are required'
            });
        }

        const email = `${prefix}@${domain}`;
        const existingUser = await User.findOne({ customEmail: email });

        return res.status(200).json({
            success: true,
            message: 'Email availability checked',
            data: {
                email,
                available: !existingUser
            }
        });

    } catch (error) {
        console.error('Error in checkEmailAvailability:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};






