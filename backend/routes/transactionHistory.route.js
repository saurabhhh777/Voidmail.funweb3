import express from 'express';
import { getTransactionHistory, getTransactionStats } from '../controllers/transactionHistory.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get transaction history (requires auth)
router.get('/history/:walletAddress', auth, getTransactionHistory);

// Get transaction statistics (requires auth)
router.get('/stats/:walletAddress', auth, getTransactionStats);

export default router;
