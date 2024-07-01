import { Request, Response, NextFunction } from "express";
import { GoogleAuth, Login, Signup } from "../schemas/user.schema";
import User from "../models/user.model";
import { sign } from "../utils/jwt";
import { sendCookie } from "../utils/sendTokenInCookie";
import { CustomError } from "../utils/CustomError";
export async function signup(
  req: Request<{}, {}, Signup["body"]>,
  res: Response,
  next: NextFunction
) {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      username,
      signedInWithEmail: true,
    });
    const token = sign(
      {
        userID: user.id,
      },
      {
        expiresIn: "1d",
      }
    );
    sendCookie(res, token, {
      maxAge: 86400000,
    });

    return res.status(201).json({
      message: "Account successfully created!",
    });
  } catch (e) {
    return next(e);
  }
}

export async function login(
  req: Request<{}, {}, Login["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new CustomError("This email doesn't exist", 404);
    }
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      throw new CustomError("Password is incorrect!", 404);
    }
    const token = sign(
      { userID: user.id },
      {
        expiresIn: "1d",
      }
    );
    sendCookie(res, token, {
      maxAge: 86400000,
    });
    res.status(200).json({
      message: "login successful",
    });
  } catch (e) {
    next(e);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  sendCookie(res, "");
  res.status(200).json({
    message: "logout successful",
  });
}

export async function googleHandler(
  req: Request<{}, {}, GoogleAuth["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, photoURL, username } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const user = await User.create({
        email,
        photoURL,
        username:
          username.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        password: Math.random().toString(36).slice(-8),
        signedInWithGoogle: true,
      });
      const token = sign(
        {
          userID: user.id,
        },
        {
          expiresIn: "1d",
        }
      );
      sendCookie(res, token, {
        maxAge: 86400000,
      });

      return res.status(201).json({
        message: "Account successfully created!",
      });
    } else {
      user.signedInWithGoogle = true;
      await user.save();
      const token = sign(
        { userID: user.id },
        {
          expiresIn: "1d",
        }
      );
      sendCookie(res, token, {
        maxAge: 86400000,
      });
    }

    res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}
