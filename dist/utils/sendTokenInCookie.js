"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCookie = void 0;
function sendCookie(res, token, options) {
    res.cookie("auth_token", token, Object.assign({ httpOnly: true, secure: process.env.NODE_ENV === "production" }, options));
}
exports.sendCookie = sendCookie;
