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
exports.updateUserProfile = exports.getUserProfile = void 0;
const UserProfile_1 = __importDefault(require("../models/UserProfile"));
// @desc    Get logged-in user's profile
// @route   GET /api/profile
// @access  Private
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const profile = yield UserProfile_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserProfile = getUserProfile;
// @desc    Update user's profile
// @route   PUT /api/profile
// @access  Private
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const profileFields = {
            bio: req.body.bio || '',
            avatar: req.body.avatar || '',
            location: req.body.location || '',
            website: req.body.website || ''
        };
        let profile = yield UserProfile_1.default.findOne({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id });
        if (!profile) {
            // Create new profile if it doesn't exist
            profileFields['user'] = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            profile = new UserProfile_1.default(profileFields);
        }
        else {
            // Update existing profile
            profile = yield UserProfile_1.default.findOneAndUpdate({ user: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id }, { $set: profileFields }, { new: true });
        }
        yield (profile === null || profile === void 0 ? void 0 : profile.save());
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateUserProfile = updateUserProfile;
