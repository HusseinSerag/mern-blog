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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsStats = exports.editCommentHandler = exports.deleteCommentHandler = exports.UnlikeCommentHandler = exports.LikeCommentHandler = exports.getCommentHandler = exports.createCommentHandler = void 0;
const CustomError_1 = require("../utils/CustomError");
const comment_model_1 = require("../models/comment.model");
const comment_service_1 = require("../services/comment.service");
function createCommentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            console.log(user.id, req.params.id);
            if (user.id !== req.params.id) {
                throw new CustomError_1.CustomError("This operation is forbidden", 403);
            }
            const comment = yield comment_model_1.Comment.create({
                content: req.body.content,
                userID: req.params.id,
                postID: req.params.postID,
            });
            return res.status(201).json({
                message: "success",
                comment: yield comment.populate("user"),
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.createCommentHandler = createCommentHandler;
function getCommentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { comments, totalCount } = yield (0, comment_service_1.getComments)(req.query, req.params);
            return res.status(200).json({
                comments: comments,
                count: comments.length,
                totalCount,
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.getCommentHandler = getCommentHandler;
function LikeCommentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user.id !== req.params.id) {
                throw new CustomError_1.CustomError("This action is forbidden", 403);
            }
            const comment = yield comment_model_1.Comment.findById(req.params.commentID);
            if (!comment) {
                throw new CustomError_1.CustomError("This comment doesn't exist!", 404);
            }
            if (!comment.likedUsers.includes(user.id)) {
                comment.likedUsers.push(user.id);
                comment.numberOfLikes++;
            }
            yield comment.save();
            return res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.LikeCommentHandler = LikeCommentHandler;
function UnlikeCommentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user.id !== req.params.id) {
                throw new CustomError_1.CustomError("This action is forbidden", 403);
            }
            const comment = yield comment_model_1.Comment.findById(req.params.commentID);
            if (!comment) {
                throw new CustomError_1.CustomError("This comment doesn't exist!", 404);
            }
            if (comment.likedUsers.includes(user.id)) {
                const users = comment.likedUsers.filter((currentUser) => !currentUser.equals(user.id));
                comment.likedUsers = users;
                comment.numberOfLikes--;
            }
            yield comment.save();
            return res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.UnlikeCommentHandler = UnlikeCommentHandler;
function deleteCommentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user.id !== req.params.id) {
                throw new CustomError_1.CustomError("This action is forbidden", 403);
            }
            const comment = yield comment_model_1.Comment.findById(req.params.commentID);
            if (!comment) {
                throw new CustomError_1.CustomError("This comment doesn't exist!", 404);
            }
            if (comment.userID.equals(user._id) || user.role === "admin") {
                yield comment.deleteOne();
            }
            return res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.deleteCommentHandler = deleteCommentHandler;
function editCommentHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user.id !== req.params.id) {
                throw new CustomError_1.CustomError("This action is forbidden", 403);
            }
            const comment = yield comment_model_1.Comment.findById(req.params.commentID);
            if (!comment) {
                throw new CustomError_1.CustomError("This comment doesn't exist!", 404);
            }
            comment.content = req.body.content;
            yield comment.save();
            return res.status(200).json({
                message: "success",
            });
        }
        catch (e) {
            next(e);
        }
    });
}
exports.editCommentHandler = editCommentHandler;
function getCommentsStats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const totalComments = yield comment_model_1.Comment.find();
        const totalCommentsLastMonth = yield comment_model_1.Comment.aggregate([
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
            totalComments: totalComments.length,
            totalCommentsLastMonth: totalCommentsLastMonth.length,
        });
    });
}
exports.getCommentsStats = getCommentsStats;
