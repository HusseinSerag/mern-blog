import * as z from "zod";

export const querySchema = z
  .object({
    sort: z.string().optional(),
    limit: z.string().pipe(z.coerce.number()).optional(),
    fields: z.string().optional(),
    page: z.string().pipe(z.coerce.number()).optional(),
  })
  .catchall(
    z.union([
      z.string(),
      z.number(),
      z.object({}).passthrough(),
      z.array(z.string()),
    ])
  );

export type Query = z.infer<typeof querySchema>;
