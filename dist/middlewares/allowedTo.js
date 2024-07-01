"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTo = void 0;
const CustomError_1 = require("../utils/CustomError");
function allowedTo(...roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role))
            return next(new CustomError_1.CustomError("You cannot do this operation!", 403));
        return next();
    };
}
exports.allowedTo = allowedTo;
