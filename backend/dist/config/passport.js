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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function configurePassport() {
    // Serialize and Deserialize User
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }));
    // Google Strategy
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    }, (_accessToken, _refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, displayName, emails } = profile;
            let user = yield User_1.default.findOne({ googleId: id });
            if (!user) {
                user = yield User_1.default.create({
                    googleId: id,
                    name: displayName,
                    email: emails && emails[0].value,
                });
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    })));
    // GitHub Strategy
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
    }, (_accessToken, _refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, username, emails } = profile;
            let user = yield User_1.default.findOne({ githubId: id });
            if (!user) {
                user = yield User_1.default.create({
                    githubId: id,
                    name: username,
                    email: emails && emails[0].value,
                });
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    })));
    // JWT Strategy (optional, if needed for protected routes)
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.JWT_SECRET,
    }, (jwtPayload, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.findById(jwtPayload.id);
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        }
        catch (err) {
            return done(err, false);
        }
    })));
}
exports.default = configurePassport;
