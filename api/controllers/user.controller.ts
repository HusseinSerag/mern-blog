import { Request, Response, NextFunction } from "express";
import { IRequest } from "../type";
import { omit } from "lodash";
import { EditUser, GetUsers, UserIDType } from "../schemas/user.schema";

import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

import { CustomError } from "../utils/CustomError";
import { getUser, getUsers } from "../services/user.service";
import User from "../models/user.model";

export async function meHandler(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const user = req.user!;

  res.status(200).json({
    user: omit(user.toObject(), "password"),
  });
}
export async function editUserHandler(
  req: IRequest<{}, {}, EditUser["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user!;
    if (user.signedInWithGoogle) {
      if (user.email !== req.body.email) {
        throw new CustomError("Cannot change your mail!", 400);
      }
    }
    const files = req.files as Express.Multer.File[];
    if (files && files.length > 0) {
      await deleteFromCloudinary(
        `mern-blog/${user.photoURL
          ?.split("/mern-blog")?.[1]
          ?.split(".")?.[0]
          ?.replace("/", "")}`
      );

      const photo = files[0];
      const data = await uploadToCloudinary(photo, {
        folder: "/mern-blog",
      });
      user.photoURL = data.url;
      await user.save();
    }

    await user.updateOne(req.body, {
      new: true,
    });

    res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}

export async function deleteUserHandler(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    await req.user?.deleteOne();
    res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}

export async function getAllUsers(
  req: IRequest<{}, {}, {}, GetUsers["query"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { totalCount, users } = await getUsers(req.query);
    return res.status(200).json({
      users: users,
      count: users.length,
      totalCount,
    });
  } catch (e) {
    next(e);
  }
}

export async function getUsersStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const totalUser = await User.find();

    const totalUserLastMonth = await User.aggregate([
      {
        $match: {
          $expr: {
            $gte: [
              "$createdAt",
              {
                $dateAdd: {
                  startDate: new Date(),
                  unit: "month",
                  amount: -1,
                },
              },
            ],
          },
        },
      },
    ]);

    return res.status(200).json({
      totalUser: totalUser.length,
      totalUserLastMonth: totalUserLastMonth.length,
    });
  } catch (e) {
    next(e);
  }
}

export async function deleteAUser(
  req: IRequest<UserIDType["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const { userID } = req.params;
    const user = await getUser(userID);
    if (user.role === "admin") {
      throw new CustomError("You cannot delete this user", 403);
    }
    await user.deleteOne();
    res.status(200).json({
      message: "success",
    });
  } catch (e) {
    next(e);
  }
}
