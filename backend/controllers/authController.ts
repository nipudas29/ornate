import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';

// Register new user
export const register = async (req: Request, res: Response): Promise<void> => {
  const { walletAddress } = req.body;

  try {
    let user = await User.findOne({ walletAddress });

    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      walletAddress: walletAddress
    });

    await user.save();
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  console.log('Req Body: ', req.body)
  const { walletAddress } = req.body;

  try {
    const user = await User.findOne({ walletAddress }) as IUser;
    if (!user) {
      res.status(400).json({ msg: 'User not found' });
      return;
    }

    // const isMatch = await bcrypt.compare(password, user.password as string);
    // if (!isMatch) {
    //   res.status(400).json({ msg: 'Invalid credentials' });
    //   return;
    // }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: 3600 }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
