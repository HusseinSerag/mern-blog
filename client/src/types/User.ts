import * as z from "zod";
export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  photoURL: z.string().optional(),
  _id: z.string(),
  signedInWithGoogle: z.boolean().optional(),
  signedInWithEmail: z.boolean().optional(),
  role: z.union([z.literal("admin"), z.literal("user")]),
});

export type User = z.infer<typeof userSchema>;
