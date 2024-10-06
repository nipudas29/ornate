import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { getUserProfile, updateUserProfile } from '../controllers/profileController';

const router = express.Router();


// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);


router.route('/profile')
    .get(protect, getUserProfile)      // Fetch user profile
    .put(protect, updateUserProfile);  // Update profile


// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_req, res) => {
    res.redirect('/dashboard');
  }
);

// GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (_req, res) => {
    res.redirect('/dashboard');
  }
);

export default router;
