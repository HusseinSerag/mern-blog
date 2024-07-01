import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {
  createCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getCommentHandler,
  getCommentsStats,
  LikeCommentHandler,
  UnlikeCommentHandler,
} from "../controllers/comment.controller";
import validate from "../middlewares/validateSchema";
import { createComment, LikeUnLikeComment } from "../schemas/comment.schema";
import { allowedTo } from "../middlewares/allowedTo";

const router = Router({ mergeParams: true });

router
  .route("/")
  .post(verifyToken, validate(createComment), createCommentHandler)
  .get(getCommentHandler);
router.get(
  "/admin-comments",
  verifyToken,
  allowedTo("admin"),
  getCommentHandler
);

router.patch(
  "/:commentID/like",
  verifyToken,
  validate(LikeUnLikeComment),
  LikeCommentHandler
);
router.patch(
  "/:commentID/unlike",
  verifyToken,
  validate(LikeUnLikeComment),
  UnlikeCommentHandler
);
router
  .route("/:commentID")
  .delete(verifyToken, validate(LikeUnLikeComment), deleteCommentHandler)
  .patch(
    verifyToken,
    validate(createComment),
    validate(LikeUnLikeComment),
    editCommentHandler
  );
router.get("/get-stats", verifyToken, allowedTo("admin"), getCommentsStats);
export default router;
