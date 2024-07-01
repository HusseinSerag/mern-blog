import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import log from "../utils/logger";
import { MongoError, MongoServerError } from "mongodb";

export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.info(error);
  if (error instanceof CustomError) {
    return res.status(error.code).json({
      status: "failure",
      message: error.message,
    });
  } else if (
    error.name === "MongoServerError" &&
    "code" in error &&
    error.code === 11000
  ) {
    const name = Object.keys(
      (
        error as unknown as {
          keyPattern: {
            [name: string]: unknown;
          };
        }
      ).keyPattern
    )[0];
    return res.status(400).json({
      status: "failure",
      message: `This ${name} is already taken`,
    });
  } else {
    return res.status(500).json({
      status: "failure",
      message: "Something went wrong!",
    });
  }
}
