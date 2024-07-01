"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const allowedTo_1 = require("../middlewares/allowedTo");
const multer_1 = __importDefault(require("multer"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const comment_route_1 = __importDefault(require("./comment.route"));
const post_schema_1 = require("../schemas/post.schema");
const post_controller_1 = require("../controllers/post.controller");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)({
    mergeParams: true,
});
router.use("/:postID/comments", comment_route_1.default);
router.get("/get-stats", (0, validateSchema_1.default)(post_schema_1.PostStats), post_controller_1.getPostsStats);
router.get("/recent-posts", post_controller_1.getRecentPosts, post_controller_1.getPostsHandler);
router
    .route("/")
    .post(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), upload.array("photo", 1), (0, validateSchema_1.default)(post_schema_1.createPost), post_controller_1.createPostHandler)
    .get(post_controller_1.getPostsHandler);
router
    .route("/:postID")
    .get((0, validateSchema_1.default)(post_schema_1.PostParams), post_controller_1.getPostHandler)
    .delete(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), (0, validateSchema_1.default)(post_schema_1.PostParams), post_controller_1.deletePostHandler)
    .patch(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), upload.array("photo", 1), (0, validateSchema_1.default)(post_schema_1.PostParams), (0, validateSchema_1.default)(post_schema_1.createPost), post_controller_1.updatePostHandler);
exports.default = router;
