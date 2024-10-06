import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId?: string;
  facebookId?: string;
  githubId?: string;
  email: string;
  name?: string;
  password?: string;
  walletAddress?: string;
}

const userSchema: Schema = new Schema({
  googleId: { type: String },
  facebookId: { type: String },
  githubId: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String }, // Only if using email/password method
  walletAddress: { type: String },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
