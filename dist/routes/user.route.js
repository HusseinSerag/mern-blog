"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const user_schema_1 = require("../schemas/user.schema");
const verifyToken_1 = require("../middlewares/verifyToken");
const user_controller_1 = require("../controllers/user.controller");
const post_route_1 = __importDefault(require("./post.route"));
const multer_1 = __importDefault(require("multer"));
const allowedTo_1 = require("../middlewares/allowedTo");
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.use("/:id/posts", post_route_1.default);
router.post("/signup", (0, validateSchema_1.default)(user_schema_1.SignupSchema), auth_controller_1.signup);
router.get("/me", verifyToken_1.verifyToken, user_controller_1.meHandler);
router.post("/signin", (0, validateSchema_1.default)(user_schema_1.LoginSchema), auth_controller_1.login);
router.post("/google", (0, validateSchema_1.default)(user_schema_1.googleSchema), auth_controller_1.googleHandler);
router.post("/logout", auth_controller_1.logout);
router.patch("/", verifyToken_1.verifyToken, upload.array("photo", 1), (0, validateSchema_1.default)(user_schema_1.editUser), user_controller_1.editUserHandler);
router
    .route("/")
    .delete(verifyToken_1.verifyToken, user_controller_1.deleteUserHandler)
    .get(verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), (0, validateSchema_1.default)(user_schema_1.getUsersSchema), user_controller_1.getAllUsers);
router.delete("/delete-user/:userID", verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), (0, validateSchema_1.default)(user_schema_1.userIDSchema), user_controller_1.deleteAUser);
router.get("/get-stats", verifyToken_1.verifyToken, (0, allowedTo_1.allowedTo)("admin"), user_controller_1.getUsersStats);
exports.default = router;
