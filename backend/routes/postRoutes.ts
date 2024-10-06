import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getPosts, createPost, getPostById } from '../controllers/postController';

const router = express.Router();

// Get all posts or create a new one
router.route('/')
    .get(getPosts)
    .post(protect, createPost);

// Get a single post by ID
router.route('/:id')
    .get(getPostById);

export default router;
