import { CookieOptions, Response } from "express";

export function sendCookie(
  res: Response,
  token: string,
  options?: CookieOptions
) {
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
}
