"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const postController_1 = require("../controllers/postController");
const router = express_1.default.Router();
// Get all posts or create a new one
router.route('/')
    .get(postController_1.getPosts)
    .post(authMiddleware_1.protect, postController_1.createPost);
// Get a single post by ID
router.route('/:id')
    .get(postController_1.getPostById);
exports.default = router;
