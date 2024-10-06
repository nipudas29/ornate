import { Request, Response } from 'express';
import UserProfile from '../models/UserProfile';

// @desc    Get logged-in user's profile
// @route   GET /api/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await UserProfile.findOne({ user: req.user?.id });
    
    if (!profile) {
      res.status(404).json({ message: 'Profile not found' });
      return;
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user's profile
// @route   PUT /api/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileFields = {
      bio: req.body.bio || '',
      avatar: req.body.avatar || '',
      location: req.body.location || '',
      website: req.body.website || ''
    };

    let profile = await UserProfile.findOne({ user: req.user?.id });

    if (!profile) {
      // Create new profile if it doesn't exist
      profileFields['user'] = req.user?.id;
      profile = new UserProfile(profileFields);
    } else {
      // Update existing profile
      profile = await UserProfile.findOneAndUpdate(
        { user: req.user?.id },
        { $set: profileFields },
        { new: true }
      );
    }

    await profile?.save();
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
