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
exports.deleteAUser = exports.getUsersStats = exports.getAllUsers = exports.deleteUserHandler = exports.editUserHandler = exports.meHandler = void 0;
const lodash_1 = require("lodash");
const cloudinary_1 = require("../utils/cloudinary");
const CustomError_1 = require("../utils/CustomError");
const user_service_1 = require("../services/user.service");
const user_model_1 = __importDefault(require("../models/user.model"));
function meHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        res.status(200).json({
            user: (0, lodash_1.omit)(user.toObject(), "password"),
        });
    });
}
exports.meHandler = meHandler;
function editUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const user = req.user;
            if (user.signedInWithGoogle) {
                if (user.email !== req.body.email) {
                    throw new CustomError_1.CustomError("Cannot change your mail!", 400);
                }
            }
            const files = req.files;
            if (files && files.length > 0) {
                yield (0, cloudinary_1.deleteFromCloudinary)(`mern-blog/${(_e = (_d = (_c = (_b = (_a = user.photoURL) === null || _a === void 0 ? void 0 : _a.split("/mern-blog")) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.split(".")) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.replace("/", "")}`);
                const photo = files[0];
                const data = yield (0, cloudinary_1.uploadToCloudinary)(photo, {
                    folder: "/mern-blog",
                });
                user.photoURL = data.url;
                yield user.save();
            }
            yield user.updateOne(req.body, {
                new: true,
            });
            res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.editUserHandler = editUserHandler;
function deleteUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield ((_a = req.user) === null || _a === void 0 ? void 0 : _a.deleteOne());
            res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { totalCount, users } = yield (0, user_service_1.getUsers)(req.query);
            return res.status(200).json({
                users: users,
                count: users.length,
                totalCount,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUsersStats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const totalUser = yield user_model_1.default.find();
            const totalUserLastMonth = yield user_model_1.default.aggregate([
                {
                    $match: {
                        $expr: {
                            $gte: [
                                "$createdAt",
                                {
                                    $dateAdd: {
                                        startDate: new Date(),
                                        unit: "month",
                                        amount: -1,
                                    },
                                },
                            ],
                        },
                    },
                },
            ]);
            return res.status(200).json({
                totalUser: totalUser.length,
                totalUserLastMonth: totalUserLastMonth.length,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getUsersStats = getUsersStats;
function deleteAUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userID } = req.params;
            const user = yield (0, user_service_1.getUser)(userID);
            if (user.role === "admin") {
                throw new CustomError_1.CustomError("You cannot delete this user", 403);
            }
            yield user.deleteOne();
            res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.deleteAUser = deleteAUser;
