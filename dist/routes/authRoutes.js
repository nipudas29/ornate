"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
// Register new user
router.post('/register', authController_1.register);
// Login user
router.post('/login', authController_1.login);
router.route('/profile')
    .get(authMiddleware_1.protect, profileController_1.getUserProfile) // Fetch user profile
    .put(authMiddleware_1.protect, profileController_1.updateUserProfile); // Update profile
// Google OAuth
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (_req, res) => {
    res.redirect('/dashboard');
});
// GitHub OAuth
router.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), (_req, res) => {
    res.redirect('/dashboard');
});
exports.default = router;
