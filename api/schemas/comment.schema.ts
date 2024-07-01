import * as z from "zod";
const Comment = z.object({
  content: z.string({
    required_error: "Content is required!",
  }),
});

export const createComment = z.object({
  body: Comment,
  params: z.object({
    postID: z.string(),
    id: z.string(),
  }),
});

export const LikeUnLikeComment = z.object({
  params: z.object({
    postID: z.string(),
    id: z.string(),
    commentID: z.string(),
  }),
});

export type LikeUnLikeCommentType = z.infer<typeof LikeUnLikeComment>;

export type CreateComment = z.infer<typeof createComment>;

export const CommentParams = z.object({
  params: z.object({
    postID: z.string().optional(),
  }),
});

export type CommentParamsType = z.infer<typeof CommentParams>;
