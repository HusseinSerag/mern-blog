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
exports.updatePostHandler = exports.deletePostHandler = exports.getPostHandler = exports.getPostsStats = exports.getRecentPosts = exports.getPostsHandler = exports.createPostHandler = void 0;
const post_service_1 = require("../services/post.service");
const CustomError_1 = require("../utils/CustomError");
const post_model_1 = __importDefault(require("../models/post.model"));
const mongodb_1 = require("mongodb");
const cloudinary_1 = require("../utils/cloudinary");
function createPostHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = req.files;
            const post = yield (0, post_service_1.createPost)(req.body, req.user._id, files);
            return res.status(201).json({
                status: "success",
                post: post,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.createPostHandler = createPostHandler;
function getPostsHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { posts, totalCount } = yield (0, post_service_1.getPost)(req.query);
            return res.status(200).json({
                posts: posts,
                count: posts.length,
                totalCount,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getPostsHandler = getPostsHandler;
function getRecentPosts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        req.query.limit = 3;
        next();
    });
}
exports.getRecentPosts = getRecentPosts;
function getPostsStats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.params.id)
            return next(new CustomError_1.CustomError("A user must be specified!", 400));
        const userID = req.params.id;
        const totalPosts = yield post_model_1.default.find({
            userID,
        });
        const totalPostsLastMonth = yield post_model_1.default.aggregate([
            {
                $match: {
                    userID: new mongodb_1.ObjectId(userID),
                },
            },
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
            totalPosts: totalPosts.length,
            totalPostsLastMonth: totalPostsLastMonth.length,
        });
    });
}
exports.getPostsStats = getPostsStats;
function getPostHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, postID } = req.params;
            const { posts, totalCount } = yield (0, post_service_1.getPost)(req.query, Object.assign({ _id: postID }, (id && {
                userID: id,
            })));
            return res.status(200).json({
                posts: posts,
                count: posts.length,
                totalCount,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getPostHandler = getPostHandler;
function deletePostHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const { id, postID } = req.params;
            const post = yield post_model_1.default.findOneAndDelete({
                _id: postID,
                userID: id,
            });
            if (!post) {
                throw new CustomError_1.CustomError("Unable to delete post!", 404);
            }
            yield (0, cloudinary_1.deleteFromCloudinary)(`posts/${(_e = (_d = (_c = (_b = (_a = post.photoURL) === null || _a === void 0 ? void 0 : _a.split("/posts")) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.split(".")) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.replace("/", "")}`);
            return res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.deletePostHandler = deletePostHandler;
function updatePostHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const { category, content, title } = req.body;
            const user = req.user;
            const files = req.files;
            const post = yield post_model_1.default.findOne({
                _id: req.params.postID,
                userID: user._id,
            });
            if (!post) {
                throw new CustomError_1.CustomError("Post doesn't exist!", 404);
            }
            if (files && files.length > 0) {
                yield (0, cloudinary_1.deleteFromCloudinary)(`posts/${(_e = (_d = (_c = (_b = (_a = user.photoURL) === null || _a === void 0 ? void 0 : _a.split("/posts")) === null || _b === void 0 ? void 0 : _b[1]) === null || _c === void 0 ? void 0 : _c.split(".")) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.replace("/", "")}`);
                const photo = files[0];
                const data = yield (0, cloudinary_1.uploadToCloudinary)(photo, {
                    folder: "/posts",
                });
                post.photoURL = data.url;
                yield post.save();
            }
            yield post.updateOne({ category, content, title });
            return res.status(200).json({
                status: "success",
                post: post,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.updatePostHandler = updatePostHandler;
