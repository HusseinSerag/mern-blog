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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../utils/CustomError");
const logger_1 = __importDefault(require("../utils/logger"));
function errorHandler(error, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(error);
        if (error instanceof CustomError_1.CustomError) {
            return res.status(error.code).json({
                status: "failure",
                message: error.message,
            });
        }
        else if (error.name === "MongoServerError" &&
            "code" in error &&
            error.code === 11000) {
            const name = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                status: "failure",
                message: `This ${name} is already taken`,
            });
        }
        else {
            return res.status(500).json({
                status: "failure",
                message: "Something went wrong!",
            });
        }
    });
}
exports.errorHandler = errorHandler;
