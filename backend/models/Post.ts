import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    content: string;
    price: number;
    imageUrl?: string;
    createdAt: Date;
}

const PostSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IPost>('Post', PostSchema);
