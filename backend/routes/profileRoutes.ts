import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/profileController';

const router = express.Router();

router.route('/')
    .get(protect, getUserProfile)      // Fetch user profile
    .put(protect, updateUserProfile);  // Update profile

export default router;
