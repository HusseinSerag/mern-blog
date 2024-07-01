import { type Express } from "express";
import userRouter from "./routes/user.route";
import { errorHandler } from "./controllers/error.controller";
import postRouter from "./routes/post.route";
import commentRouter from "./routes/comment.route";
import path from "path";
export default function routes(app: Express) {
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/comments", commentRouter);
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  app.use(errorHandler);
}
