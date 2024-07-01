"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const CustomError_1 = require("../utils/CustomError");
const jwt_1 = require("../utils/jwt");
const user_service_1 = require("../services/user.service");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authToken = req.cookies["auth_token"];
            if (!authToken)
                throw new CustomError_1.CustomError("Unauthorized, Please log in!", 403);
            const { userID } = (0, jwt_1.verify)(authToken);
            const user = yield (0, user_service_1.getUser)(userID);
            req.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    });
}
exports.verifyToken = verifyToken;
