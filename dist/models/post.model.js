"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    photoURL: {
        type: String,
        default: "",
    },
    userID: {
        ref: "User",
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
    },
    category: {
        type: String,
        default: "uncategorized",
    },
    slug: {
        type: String,
        required: true,
        unique: true,
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
postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postID",
    ref: "Comment",
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
