import * as z from "zod";
export const commentSchema = z.object({
  content: z.string(),
  postID: z.string(),
  _id: z.string(),
  user: z.object({
    username: z.string(),
    photoURL: z.string().optional(),
    _id: z.string(),
  }),
  likedUsers: z.string().array(),
  numberOfLikes: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
