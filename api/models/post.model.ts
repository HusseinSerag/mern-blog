import mongoose from "mongoose";
import { CommentDoc } from "./comment.model";

export interface PostDoc {
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  photoURL: string;
  category: string;
  userID: mongoose.Types.ObjectId;
  slug: string;
  comments: CommentDoc[];
}
const postSchema = new mongoose.Schema<PostDoc>(
  {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    photoURL: {
      type: String,
      default: "",
    },
    userID: {
      ref: "User",
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

postSchema.virtual("comments", {
  localField: "_id",
  foreignField: "postID",
  ref: "Comment",
});
const Post = mongoose.model("Post", postSchema);

export default Post;
