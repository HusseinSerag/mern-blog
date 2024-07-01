import { Comment } from "../models/comment.model";
import Post from "../models/post.model";
import { API } from "../utils/apiServices";
import { Query } from "../utils/generalZodSchemas";

export async function getComments(
  query: Query,
  filter?: {
    postID?: string;
  }
) {
  try {
    const { limit, page, sort, fields, ...rest } = query;
    const { search, ...restFields } = rest;

    const api = new API(
      Comment.find({ ...filter }).populate({
        path: "user",
        select: "username photoURL _id",
      })
    );

    api.sort(sort);
    const { totalLength } = await api.limit(page, limit);
    const comments = await api.query;

    return {
      totalCount: totalLength,
      comments: comments,
    };
  } catch (e) {
    throw e;
  }
}
