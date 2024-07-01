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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const cloudinary_1 = require("../utils/cloudinary");
const apiServices_1 = require("../utils/apiServices");
function createPost(post, userID, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, title, category } = post;
        try {
            let photoURL = "";
            if (file && file.length > 0) {
                const photo = file[0];
                const url = yield (0, cloudinary_1.uploadToCloudinary)(photo, {
                    folder: "posts",
                });
                photoURL = url.url;
            }
            const slug = title
                .split(" ")
                .join("-")
                .toLowerCase()
                .replace(/[^a-zA-Z0-9-]/g, "-");
            const post = yield post_model_1.default.create({
                content,
                title,
                userID,
                slug,
                photoURL: photoURL ||
                    "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-1024x450.webp",
                category,
            });
            return post;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.createPost = createPost;
function getPost(query, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, page, sort, fields } = query, rest = __rest(query, ["limit", "page", "sort", "fields"]);
            const { search } = rest, restFields = __rest(rest, ["search"]);
            const api = new apiServices_1.API(post_model_1.default.find(Object.assign({}, filter)));
            api
                .filter(Object.assign(Object.assign({}, restFields), (search && {
                $or: [
                    {
                        title: { $regex: search, $options: "i" },
                    },
                    {
                        content: { $regex: search, $options: "i" },
                    },
                ],
            })))
                .sort(sort);
            const { totalLength } = yield api.limit(page, limit);
            const posts = yield api.query;
            return {
                totalCount: totalLength,
                posts: posts,
            };
        }
        catch (e) {
            throw e;
        }
    });
}
exports.getPost = getPost;
