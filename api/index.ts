import express from "express";
import dotenv from "dotenv";
import path from "path";
import log from "./utils/logger";
import connect from "./utils/connect";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
dotenv.config({ path: path.join(__dirname, "./config.env") });
import routes from "./routes";

import "./utils/cloudinary";

const app = express();

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"],
//     },
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Test connection successful",
  });
});

app.use(express.static(path.join(__dirname, "./../client/dist")));
app.listen(process.env.PORT || 8000, async () => {
  log.info("Server is running at port 8000");
  await connect();
  routes(app);
});
