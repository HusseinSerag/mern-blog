"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStats = exports.PostParams = exports.getPosts = exports.createPost = void 0;
const z = __importStar(require("zod"));
const generalZodSchemas_1 = require("../utils/generalZodSchemas");
const Post = z.object({
    title: z.string({
        required_error: "a title is required!",
    }),
    content: z.string({
        required_error: "A content is required",
    }),
    category: z.union([
        z.literal("javascript"),
        z.literal("typescript"),
        z.literal("reactjs"),
        z.literal("nextjs"),
        z.literal("uncategorized"),
    ], {
        required_error: "A category is required",
    }),
});
exports.createPost = z.object({
    body: Post,
});
exports.getPosts = z.object({
    query: generalZodSchemas_1.querySchema,
});
exports.PostParams = z.object({
    params: z.object({
        id: z.string().optional(),
        postID: z.string({
            required_error: "A post id is required",
        }),
    }),
});
exports.PostStats = z.object({
    params: z.object({
        id: z.string({
            required_error: "A user id is required",
        }),
    }),
});
