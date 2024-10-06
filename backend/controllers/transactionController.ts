import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import Post from '../models/Post';

// @desc    Create a transaction (purchase post)
// @route   POST /api/transactions/:postId
// @access  Private
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.postId);

    // If the post doesn't exist, return 404
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Create a new transaction
    const transaction = new Transaction({
      txId: req.body.txId,
      buyer: req.user?.walletAddress,  // Access the authenticated user's ID
      post: post._id,
      price: post.price,
      status: 'success'
    });

    // Save the transaction
    await transaction.save();

    // Return the created transaction with a 201 status
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user transactions (purchases)
// @route   GET /api/transactions
// @access  Private
export const getUserTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find transactions for the authenticated user
    const transactions = await Transaction.find({ buyer: req.user?.id }).populate('post');

    // Return the user's transactions
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
