import { type Express } from "express";
import userRouter from "./routes/user.route";
import { errorHandler } from "./controllers/error.controller";
import postRouter from "./routes/post.route";
import commentRouter from "./routes/comment.route";
export default function routes(app: Express) {
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/comments", commentRouter);

  app.use(errorHandler);
}
