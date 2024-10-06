"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
// Create a transaction (buy a post)
router.post('/:postId', authMiddleware_1.protect, transactionController_1.createTransaction);
// Get user transactions
router.get('/', authMiddleware_1.protect, transactionController_1.getUserTransactions);
exports.default = router;
