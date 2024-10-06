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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Assuming you're using the User model
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // Check if the token is provided in the Authorization header
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];
            // Verify the token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Find the user by ID from the decoded token and attach it to the request object
            req.user = yield User_1.default.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401).json({ message: 'User not found' });
                return;
            }
            next(); // Proceed to the next middleware or route handler
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token is not valid' });
            return;
        }
    }
    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }
});
exports.protect = protect;
