"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./logger"));
function sign(payload, options) {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, options);
    return token;
}
exports.sign = sign;
function verify(token) {
    try {
        logger_1.default.info(process.env.JWT_KEY);
        const decodedURL = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        return decodedURL;
    }
    catch (e) {
        throw e;
    }
}
exports.verify = verify;
