"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middlewares/verifyToken");
const comment_controller_1 = require("../controllers/comment.controller");
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const comment_schema_1 = require("../schemas/comment.schema");
const allowedTo_1 = require("../middlewares/allowedTo");
const router = (0, express_1.Router)({ mergeParams: true });
router
    .route("/")
    .post(verifyToken_1.verifyToken, (0, validateSchema_1.default)(comment_schema_1.createComment), comment_controller_1.createCommentHandler)
    .get(comment_controller_1.getCommentHandler);
router.get("/admin-comments", verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), comment_controller_1.getCommentHandler);
router.patch("/:commentID/like", verifyToken_1.verifyToken, (0, validateSchema_1.default)(comment_schema_1.LikeUnLikeComment), comment_controller_1.LikeCommentHandler);
router.patch("/:commentID/unlike", verifyToken_1.verifyToken, (0, validateSchema_1.default)(comment_schema_1.LikeUnLikeComment), comment_controller_1.UnlikeCommentHandler);
router
    .route("/:commentID")
    .delete(verifyToken_1.verifyToken, (0, validateSchema_1.default)(comment_schema_1.LikeUnLikeComment), comment_controller_1.deleteCommentHandler)
    .patch(verifyToken_1.verifyToken, (0, validateSchema_1.default)(comment_schema_1.createComment), (0, validateSchema_1.default)(comment_schema_1.LikeUnLikeComment), comment_controller_1.editCommentHandler);
router.get("/get-stats", verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), comment_controller_1.getCommentsStats);
exports.default = router;
