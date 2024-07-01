import mongoose from "mongoose";
export interface CommentDoc {
  content: string;
  postID: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  numberOfLikes: number;
  likedUsers: mongoose.Types.ObjectId[];
}
const commentSchema = new mongoose.Schema<CommentDoc>(
  {
    content: {
      type: String,
      required: true,
    },

    postID: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    likedUsers: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
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

commentSchema.virtual("user", {
  localField: "userID",
  foreignField: "_id",
  ref: "User",
  justOne: true,
});
commentSchema.virtual("post", {
  localField: "postID",
  foreignField: "_id",
  ref: "Post",
  justOne: true,
});
export const Comment = mongoose.model("Comment", commentSchema);
