import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createTransaction, getUserTransactions } from '../controllers/transactionController';

const router = express.Router();

// Create a transaction (buy a post)
router.post('/:postId', protect, createTransaction);

// Get user transactions
router.get('/', protect, getUserTransactions);

export default router;
