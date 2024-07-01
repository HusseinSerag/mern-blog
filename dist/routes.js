"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./routes/user.route"));
const error_controller_1 = require("./controllers/error.controller");
const post_route_1 = __importDefault(require("./routes/post.route"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
function routes(app) {
    app.use("/api/users", user_route_1.default);
    app.use("/api/posts", post_route_1.default);
    app.use("/api/comments", comment_route_1.default);
    app.use(error_controller_1.errorHandler);
}
exports.default = routes;
