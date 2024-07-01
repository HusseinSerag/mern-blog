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
exports.googleHandler = exports.logout = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const sendTokenInCookie_1 = require("../utils/sendTokenInCookie");
const CustomError_1 = require("../utils/CustomError");
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, username } = req.body;
        try {
            const user = yield user_model_1.default.create({
                email,
                password,
                username,
                signedInWithEmail: true,
            });
            const token = (0, jwt_1.sign)({
                userID: user.id,
            }, {
                expiresIn: "1d",
            });
            (0, sendTokenInCookie_1.sendCookie)(res, token, {
                maxAge: 86400000,
            });
            return res.status(201).json({
                message: "Account successfully created!",
            });
        }
        catch (e) {
            return next(e);
        }
    });
}
exports.signup = signup;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_model_1.default.findOne({
                email,
            });
            if (!user) {
                throw new CustomError_1.CustomError("This email doesn't exist", 404);
            }
            const isMatch = yield user.comparePasswords(password);
            if (!isMatch) {
                throw new CustomError_1.CustomError("Password is incorrect!", 404);
            }
            const token = (0, jwt_1.sign)({ userID: user.id }, {
                expiresIn: "1d",
            });
            (0, sendTokenInCookie_1.sendCookie)(res, token, {
                maxAge: 86400000,
            });
            res.status(200).json({
                message: "login successful",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.login = login;
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, sendTokenInCookie_1.sendCookie)(res, "");
        res.status(200).json({
            message: "logout successful",
        });
    });
}
exports.logout = logout;
function googleHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, photoURL, username } = req.body;
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                const user = yield user_model_1.default.create({
                    email,
                    photoURL,
                    username: username.toLowerCase().split(" ").join("") +
                        Math.random().toString(9).slice(-4),
                    password: Math.random().toString(36).slice(-8),
                    signedInWithGoogle: true,
                });
                const token = (0, jwt_1.sign)({
                    userID: user.id,
                }, {
                    expiresIn: "1d",
                });
                (0, sendTokenInCookie_1.sendCookie)(res, token, {
                    maxAge: 86400000,
                });
                return res.status(201).json({
                    message: "Account successfully created!",
                });
            }
            else {
                user.signedInWithGoogle = true;
                yield user.save();
                const token = (0, jwt_1.sign)({ userID: user.id }, {
                    expiresIn: "1d",
                });
                (0, sendTokenInCookie_1.sendCookie)(res, token, {
                    maxAge: 86400000,
                });
            }
            res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.googleHandler = googleHandler;
