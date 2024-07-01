import { NextFunction, Request, Response } from "express";
import { IRequest } from "../type";
import {
  CommentParamsType,
  CreateComment,
  LikeUnLikeCommentType,
} from "../schemas/comment.schema";
import { CustomError } from "../utils/CustomError";
import { Comment } from "../models/comment.model";
import { getComments } from "../services/comment.service";
import { Query } from "../utils/generalZodSchemas";
import Post from "../models/post.model";
import { GetPosts, PostParamsType } from "../schemas/post.schema";

export async function createCommentHandler(
  req: IRequest<CreateComment["params"], {}, CreateComment["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;
    console.log(user.id, req.params.id);
    if (user.id !== req.params.id) {
      throw new CustomError("This operation is forbidden", 403);
    }
    const comment = await Comment.create({
      content: req.body.content,
      userID: req.params.id,
      postID: req.params.postID,
    });

    return res.status(201).json({
      message: "success",
      comment: await comment.populate({
        path: "user",
        select: "username photoURL _id",
      }),
    });
  } catch (e) {
    next(e);
  }
}

export async function getCommentHandler(
  req: IRequest<CommentParamsType["params"], {}, {}, Query>,
  res: Response,
  next: NextFunction
) {
  try {
    const { comments, totalCount } = await getComments(req.query, req.params);
    return res.status(200).json({
      comments: comments,
      count: comments.length,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
}

export async function LikeCommentHandler(
  req: IRequest<LikeUnLikeCommentType["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;
    if (user.id !== req.params.id) {
      throw new CustomError("This action is forbidden", 403);
    }
    const comment = await Comment.findById(req.params.commentID);
    if (!comment) {
      throw new CustomError("This comment doesn't exist!", 404);
    }
    if (!comment.likedUsers.includes(user.id)) {
      comment.likedUsers.push(user.id);
      comment.numberOfLikes++;
    }
    await comment.save();

    return res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}
export async function UnlikeCommentHandler(
  req: IRequest<LikeUnLikeCommentType["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;
    if (user.id !== req.params.id) {
      throw new CustomError("This action is forbidden", 403);
    }
    const comment = await Comment.findById(req.params.commentID);
    if (!comment) {
      throw new CustomError("This comment doesn't exist!", 404);
    }
    if (comment.likedUsers.includes(user.id)) {
      const users = comment.likedUsers.filter(
        (currentUser) => !currentUser.equals(user.id)
      );

      comment.likedUsers = users;
      comment.numberOfLikes--;
    }
    await comment.save();

    return res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}

export async function deleteCommentHandler(
  req: IRequest<LikeUnLikeCommentType["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;
    if (user.id !== req.params.id) {
      throw new CustomError("This action is forbidden", 403);
    }
    const comment = await Comment.findById(req.params.commentID);

    if (!comment) {
      throw new CustomError("This comment doesn't exist!", 404);
    }

    if (comment.userID.equals(user._id) || user.role === "admin") {
      await comment.deleteOne();
    }

    return res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}

export async function editCommentHandler(
  req: IRequest<LikeUnLikeCommentType["params"], {}, CreateComment["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;
    if (user.id !== req.params.id) {
      throw new CustomError("This action is forbidden", 403);
    }
    const comment = await Comment.findById(req.params.commentID);

    if (!comment) {
      throw new CustomError("This comment doesn't exist!", 404);
    }

    comment.content = req.body.content;
    await comment.save();
    return res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}

export async function getCommentsStats(
  req: Request<{}, {}, {}, GetPosts["query"]>,
  res: Response,
  next: NextFunction
) {
  const totalComments = await Comment.find();

  const totalCommentsLastMonth = await Comment.aggregate([
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
}
