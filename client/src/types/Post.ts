import * as z from "zod";

export const postSchema = z.object({
  content: z.string(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  photoURL: z.string(),
  category: z.union([
    z.literal("javascript"),
    z.literal("typescript"),
    z.literal("reactjs"),
    z.literal("nextjs"),
    z.literal("uncategorized"),
  ]),
  slug: z.string(),
  _id: z.string(),
});

export type Post = z.infer<typeof postSchema>;
