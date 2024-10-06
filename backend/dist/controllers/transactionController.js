"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTransactions = exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const Post_1 = __importDefault(require("../models/Post"));
// @desc    Create a transaction (purchase post)
// @route   POST /api/transactions/:postId
// @access  Private
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Find the post by ID
        const post = yield Post_1.default.findById(req.params.postId);
        // If the post doesn't exist, return 404
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        // Create a new transaction
        const transaction = new Transaction_1.default({
            txId: req.body.txId,
            buyer: (_a = req.user) === null || _a === void 0 ? void 0 : _a.walletAddress, // Access the authenticated user's ID
            post: post._id,
            price: post.price,
            status: 'success'
        });
        // Save the transaction
        yield transaction.save();
        // Return the created transaction with a 201 status
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createTransaction = createTransaction;
// @desc    Get user transactions (purchases)
// @route   GET /api/transactions
// @access  Private
const getUserTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // Find transactions for the authenticated user
        const transactions = yield Transaction_1.default.find({ buyer: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id }).populate('post');
        // Return the user's transactions
        res.json(transactions);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserTransactions = getUserTransactions;
