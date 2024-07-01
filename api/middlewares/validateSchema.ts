import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { CustomError } from "../utils/CustomError";

export default function validate(schema: ZodSchema) {
  return function (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (result.error) {
        const errorMessage = (
          JSON.parse(result.error.message) as [
            {
              message: string;
            }
          ]
        ).map((el) => el.message);

        throw new CustomError(errorMessage.toString(), 400);
      }

      return next();
    } catch (e) {
      return next(e);
    }
  };
}
