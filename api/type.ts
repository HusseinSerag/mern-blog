import { Request } from "express";
import { UserDoc } from "./models/user.model";
import mongoose, { Document } from "mongoose";

type UserDocument = Document<unknown, {}, UserDoc> &
  UserDoc & {
    _id: mongoose.Types.ObjectId;
  };
export interface IRequest<P = any, ResBody = any, ReqBody = any, ReqQuery = any>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: UserDocument;
}
