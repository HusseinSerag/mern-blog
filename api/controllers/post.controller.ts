import { NextFunction, Request, Response } from "express";
import { IRequest } from "../type";
import { CreatePost, GetPosts, PostParamsType } from "../schemas/post.schema";
import { createPost, getPost } from "../services/post.service";
import { CustomError } from "../utils/CustomError";
import Post from "../models/post.model";
import { ObjectId } from "mongodb";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

export async function createPostHandler(
  req: IRequest<{}, {}, CreatePost["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    const post = await createPost(req.body, req.user!._id, files);

    return res.status(201).json({
      status: "success",
      post: post,
    });
  } catch (e) {
    next(e);
  }
}

export async function getPostsHandler(
  req: Request<{}, {}, {}, GetPosts["query"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { posts, totalCount } = await getPost(req.query);

    return res.status(200).json({
      posts: posts,
      count: posts.length,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
}
export async function getRecentPosts(
  req: Request<{}, {}, {}, GetPosts["query"]>,
  res: Response,
  next: NextFunction
) {
  req.query.limit = 3;

  next();
}

export async function getPostsStats(
  req: Request<PostParamsType["params"], {}, {}, GetPosts["query"]>,
  res: Response,
  next: NextFunction
) {
  if (!req.params.id)
    return next(new CustomError("A user must be specified!", 400));

  const userID = req.params.id;
  const totalPosts = await Post.find({
    userID,
  });

  const totalPostsLastMonth = await Post.aggregate([
    {
      $match: {
        userID: new ObjectId(userID),
      },
    },
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
    totalPosts: totalPosts.length,
    totalPostsLastMonth: totalPostsLastMonth.length,
  });
}
export async function getPostHandler(
  req: Request<PostParamsType["params"], {}, {}, GetPosts["query"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, postID } = req.params;

    const { posts, totalCount } = await getPost(req.query, {
      _id: postID,
      ...(id && {
        userID: id,
      }),
    });

    return res.status(200).json({
      posts: posts,
      count: posts.length,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
}

export async function deletePostHandler(
  req: Request<PostParamsType["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, postID } = req.params;

    const post = await Post.findOneAndDelete({
      _id: postID,
      userID: id,
    });

    if (!post) {
      throw new CustomError("Unable to delete post!", 404);
    }
    await deleteFromCloudinary(
      `posts/${post.photoURL
        ?.split("/posts")?.[1]
        ?.split(".")?.[0]
        ?.replace("/", "")}`
    );
    return res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}

export async function updatePostHandler(
  req: IRequest<PostParamsType["params"], {}, CreatePost["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { category, content, title } = req.body;
    const user = req.user!;
    const files = req.files as Express.Multer.File[] | undefined;
    const post = await Post.findOne({
      _id: req.params.postID,
      userID: user._id,
    });
    if (!post) {
      throw new CustomError("Post doesn't exist!", 404);
    }

    if (files && files.length > 0) {
      await deleteFromCloudinary(
        `posts/${user.photoURL
          ?.split("/posts")?.[1]
          ?.split(".")?.[0]
          ?.replace("/", "")}`
      );

      const photo = files[0];
      const data = await uploadToCloudinary(photo, {
        folder: "/posts",
      });
      post.photoURL = data.url;
      await post.save();
    }
    await post.updateOne({ category, content, title });

    return res.status(200).json({
      status: "success",
      post: post,
    });
  } catch (e) {
    next(e);
  }
}
