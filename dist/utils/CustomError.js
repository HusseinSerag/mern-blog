"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.CustomError = CustomError;
