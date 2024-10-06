import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Assuming you're using the User model
import { IUser } from '../models/User'; // Import your IUser interface if it's in a separate file

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request & { user?: IUser }, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  let token;

  // Check if the token is provided in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // Find the user by ID from the decoded token and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token is not valid' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }
};
