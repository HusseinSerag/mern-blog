import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import { verify } from "../utils/jwt";
import { IRequest } from "../type";
import { getUser } from "../services/user.service";

export async function verifyToken(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.cookies["auth_token"];

    if (!authToken) throw new CustomError("Unauthorized, Please log in!", 403);

    const { userID } = verify(authToken);
    const user = await getUser(userID);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}
