import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    txId: string;
    buyer: mongoose.Schema.Types.ObjectId;
    post: mongoose.Schema.Types.ObjectId;
    price: number;
    date: Date;
    status: string;
}

const TransactionSchema: Schema = new Schema({
    txId: {
        type: String,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'pending'
    }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
