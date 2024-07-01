import { Response, NextFunction } from "express";
import { IRequest } from "../type";
import { UserDoc } from "../models/user.model";
import { CustomError } from "../utils/CustomError";

export function allowedTo(...roles: UserDoc["role"][]) {
  return function (req: IRequest, res: Response, next: NextFunction) {
    if (!roles.includes(req.user!.role))
      return next(new CustomError("You cannot do this operation!", 403));
    return next();
  };
}
