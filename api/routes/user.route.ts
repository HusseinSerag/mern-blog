import { Router } from "express";
import {
  googleHandler,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import validate from "../middlewares/validateSchema";
import {
  editUser,
  getUsersSchema,
  googleSchema,
  LoginSchema,
  SignupSchema,
  userIDSchema,
} from "../schemas/user.schema";
import { verifyToken } from "../middlewares/verifyToken";
import {
  deleteAUser,
  deleteUserHandler,
  editUserHandler,
  getAllUsers,
  getUsersStats,
  meHandler,
} from "../controllers/user.controller";
import postRouter from "./post.route";
import multer from "multer";
import { allowedTo } from "../middlewares/allowedTo";
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.use("/:id/posts", postRouter);
router.post("/signup", validate(SignupSchema), signup);
router.get("/me", verifyToken, meHandler);
router.post("/signin", validate(LoginSchema), login);
router.post("/google", validate(googleSchema), googleHandler);
router.post("/logout", logout);
router.patch(
  "/",
  verifyToken,
  upload.array("photo", 1),
  validate(editUser),
  editUserHandler
);
router
  .route("/")
  .delete(verifyToken, deleteUserHandler)
  .get(verifyToken, allowedTo("admin"), validate(getUsersSchema), getAllUsers);
router.delete(
  "/delete-user/:userID",
  verifyToken,
  allowedTo("admin"),
  validate(userIDSchema),
  deleteAUser
);
router.get("/get-stats", verifyToken, allowedTo("admin"), getUsersStats);

export default router;
