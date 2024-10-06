import { Request, Response } from 'express';
import Post from '../models/Post';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, price, imageUrl } = req.body;

    const post = new Post({
      user: req.user?.id,  // Ensure `req.user` is properly typed from middleware
      title,
      content,
      price,
      imageUrl,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name');

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
