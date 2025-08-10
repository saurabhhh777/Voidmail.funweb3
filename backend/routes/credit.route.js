import express from 'express';
import { getCreditPricing, verifyCreditPurchase, getUserCredits, getCreditTransactions, processCreditPurchase, testSmartContractConnection } from '../controllers/credit.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get credit pricing (public)
router.get('/pricing', getCreditPricing);

// Test smart contract connection (public)
router.get('/test-connection', testSmartContractConnection);

// Process credit purchase (requires auth) - New endpoint for frontend
router.post('/purchase', auth, processCreditPurchase);

// Verify credit purchase (requires auth)
router.post('/verify-purchase', auth, verifyCreditPurchase);

// Get user credits (requires auth)
router.get('/user/:walletAddress', auth, getUserCredits);

// Get credit transaction history (requires auth)
router.get('/transactions/:walletAddress', auth, getCreditTransactions);

export default router; 