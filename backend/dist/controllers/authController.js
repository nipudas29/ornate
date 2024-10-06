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
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Register new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletAddress } = req.body;
    try {
        let user = yield User_1.default.findOne({ walletAddress });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        user = new User_1.default({
            walletAddress: walletAddress
        });
        yield user.save();
        res.json({ msg: 'User registered successfully' });
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.register = register;
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { walletAddress } = req.body;
    try {
        const user = yield User_1.default.findOne({ walletAddress });
        if (!user) {
            res.status(400).json({ msg: 'User not found' });
            return;
        }
        // const isMatch = await bcrypt.compare(password, user.password as string);
        // if (!isMatch) {
        //   res.status(400).json({ msg: 'Invalid credentials' });
        //   return;
        // }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.login = login;
