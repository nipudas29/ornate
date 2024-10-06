// src/types/index.d.ts
import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}