import * as z from "zod";

export const ErrorSchema = z.object({
  message: z.string(),
});

export type CustomError = z.infer<typeof ErrorSchema>;
