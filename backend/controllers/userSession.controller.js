import UserSession from '../models/userSession.model.js';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const createUserSession = async (req, res) => {
    try {
      
        // Generate a unique session ID
        const sessionId = uuidv4();
        
        // Set expiration time (e.g., 1 hour from now)
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        // Create new session
        const session = await UserSession.create({
            sessionId,
            expiresAt
        });

        // Set cookie with session ID
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        return res.status(201).json({
            success: true,
            message: 'Session created successfully',
            data: {
                sessionId,
                expiresAt
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

export const createEmail = async (req, res) => {
    try {
        // Get session ID from cookie
        const {sessionId} = req.cookies;

        console.log("sessionId",sessionId);

        if (!sessionId) {
            return res.status(401).json({
                success: false,
                message: 'No session found. Please create a session first.'
            });
        }

        // Find the user session
        const userSession = await UserSession.findOne({ sessionId });

        if (!userSession) {
            return res.status(401).json({
                success: false,
                message: 'Invalid session. Please create a new session.'
            });
        }

        // If user already has an email, return it
        if (userSession.email) {
            return res.status(200).json({
                success: true,
                message: 'Email already exists for this session',
                data: {
                    email: userSession.email
                }
            });
        }

        // Define domains
        const domains = ["asksaurabh.xyz", "bigtimer.site"];
        const domain = domains[Math.floor(Math.random() * domains.length)];

        // Generate email prefix
        const prefix = crypto.randomBytes(4).toString('hex');
        const email = `${prefix}@${domain}`;

        // Update user session with email
        userSession.email = email;
        await userSession.save();

        return res.status(201).json({
            success: true,
            message: 'Email created successfully',
            data: {
                email
            }
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






