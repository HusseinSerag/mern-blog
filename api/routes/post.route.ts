import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken";
import { allowedTo } from "../middlewares/allowedTo";
import multer from "multer";
import validate from "../middlewares/validateSchema";
import commentRouter from "./comment.route";
import { createPost, PostParams, PostStats } from "../schemas/post.schema";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
  getPostsStats,
  getRecentPosts,
  updatePostHandler,
} from "../controllers/post.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router({
  mergeParams: true,
});

router.use("/:postID/comments", commentRouter);
router.get("/get-stats", validate(PostStats), getPostsStats);
router.get("/recent-posts", getRecentPosts, getPostsHandler);
router
  .route("/")
  .post(
    verifyToken,
    allowedTo("admin"),
    upload.array("photo", 1),
    validate(createPost),
    createPostHandler
  )
  .get(getPostsHandler);

router
  .route("/:postID")
  .get(validate(PostParams), getPostHandler)
  .delete(
    verifyToken,
    allowedTo("admin"),
    validate(PostParams),
    deletePostHandler
  )
  .patch(
    verifyToken,
    allowedTo("admin"),
    upload.array("photo", 1),
    validate(PostParams),
    validate(createPost),
    updatePostHandler
  );
export default router;
