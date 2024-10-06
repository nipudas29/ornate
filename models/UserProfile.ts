import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
    user: mongoose.Schema.Types.ObjectId;
    bio?: string;
    avatar?: string;
    location?: string;
    website?: string;
    createdAt: Date;
}

const UserProfileSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
