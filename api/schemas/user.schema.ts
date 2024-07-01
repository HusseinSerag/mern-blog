import * as z from "zod";
import { querySchema } from "../utils/generalZodSchemas";

const User = z.object({
  username: z.string({
    required_error: "Username is required!",
  }),
  password: z.string({
    required_error: "A password is required",
  }),
  email: z
    .string({
      required_error: "an email is required!",
    })
    .email("Please enter a valid email address!"),
});

export const SignupSchema = z.object({
  body: User,
});

export type Signup = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "A password is required",
    }),
    email: z
      .string({
        required_error: "an email is required!",
      })
      .email("Please enter a valid email address!"),
  }),
});

export type Login = z.infer<typeof LoginSchema>;

export const googleSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required!",
    }),
    email: z
      .string({
        required_error: "an email is required!",
      })
      .email("Please enter a valid email address!"),
    photoURL: z.string({
      required_error: "A photo URL is required",
    }),
  }),
});

export type GoogleAuth = z.infer<typeof googleSchema>;

export const editUser = z.object({
  body: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email("Please enter a valid email address!").optional(),
  }),
});

export type EditUser = z.infer<typeof editUser>;

export const getUsersSchema = z.object({
  query: querySchema,
});

export type GetUsers = z.infer<typeof getUsersSchema>;

export const userIDSchema = z.object({
  params: z.object({
    userID: z.string(),
  }),
});
export type UserIDType = z.infer<typeof userIDSchema>;
