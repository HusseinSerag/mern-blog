"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    postID: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Post",
        required: true,
    },
    userID: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    likedUsers: {
        type: [mongoose_1.default.Schema.ObjectId],
        ref: "User",
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
commentSchema.virtual("user", {
    localField: "userID",
    foreignField: "_id",
    ref: "User",
    justOne: true,
});
commentSchema.virtual("post", {
    localField: "postID",
    foreignField: "_id",
    ref: "Post",
    justOne: true,
});
exports.Comment = mongoose_1.default.model("Comment", commentSchema);
