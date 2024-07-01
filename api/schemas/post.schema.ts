import * as z from "zod";
import { querySchema } from "../utils/generalZodSchemas";
const Post = z.object({
  title: z.string({
    required_error: "a title is required!",
  }),
  content: z.string({
    required_error: "A content is required",
  }),
  category: z.union(
    [
      z.literal("javascript"),
      z.literal("typescript"),
      z.literal("reactjs"),
      z.literal("nextjs"),
      z.literal("uncategorized"),
    ],
    {
      required_error: "A category is required",
    }
  ),
});

export const createPost = z.object({
  body: Post,
});

export type CreatePost = z.infer<typeof createPost>;

export const getPosts = z.object({
  query: querySchema,
});

export type GetPosts = z.infer<typeof getPosts>;

export const PostParams = z.object({
  params: z.object({
    id: z.string().optional(),
    postID: z.string({
      required_error: "A post id is required",
    }),
  }),
});

export const PostStats = z.object({
  params: z.object({
    id: z.string({
      required_error: "A user id is required",
    }),
  }),
});

export type PostParamsType = z.infer<typeof PostParams>;
export type PostStatsType = z.infer<typeof PostStats>;
