import mongoose from "mongoose";
import Post from "../models/post.model";
import { CreatePost, GetPosts } from "../schemas/post.schema";
import { uploadToCloudinary } from "../utils/cloudinary";
import { API } from "../utils/apiServices";

export async function createPost(
  post: CreatePost["body"],
  userID: mongoose.Types.ObjectId,
  file: Express.Multer.File[] | undefined
) {
  const { content, title, category } = post;
  try {
    let photoURL = "";

    if (file && file.length > 0) {
      const photo = file[0];
      const url = await uploadToCloudinary(photo, {
        folder: "posts",
      });
      photoURL = url.url;
    }
    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const post = await Post.create({
      content,
      title,
      userID,
      slug,
      photoURL:
        photoURL ||
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post-1024x450.webp",
      category,
    });

    return post;
  } catch (e) {
    throw e;
  }
}

export async function getPost(
  query: GetPosts["query"],
  filter?: {
    userID?: string;
    _id: string;
  }
) {
  try {
    const { limit, page, sort, fields, ...rest } = query;
    const { search, ...restFields } = rest;

    const api = new API(Post.find({ ...filter }));

    api
      .filter({
        ...restFields,
        ...(search && {
          $or: [
            {
              title: { $regex: search, $options: "i" },
            },
            {
              content: { $regex: search, $options: "i" },
            },
          ],
        }),
      })
      .sort(sort);
    const { totalLength } = await api.limit(page, limit);
    const posts = await api.query;

    return {
      totalCount: totalLength,
      posts: posts,
    };
  } catch (e) {
    throw e;
  }
}
