"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIDSchema = exports.getUsersSchema = exports.editUser = exports.googleSchema = exports.LoginSchema = exports.SignupSchema = void 0;
const z = __importStar(require("zod"));
const generalZodSchemas_1 = require("../utils/generalZodSchemas");
const User = z.object({
    username: z.string({
        required_error: "Username is required!",
    }),
    password: z.string({
        required_error: "A password is required",
    }),
    email: z
        .string({
        required_error: "an email is required!",
    })
        .email("Please enter a valid email address!"),
});
exports.SignupSchema = z.object({
    body: User,
});
exports.LoginSchema = z.object({
    body: z.object({
        password: z.string({
            required_error: "A password is required",
        }),
        email: z
            .string({
            required_error: "an email is required!",
        })
            .email("Please enter a valid email address!"),
    }),
});
exports.googleSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "Username is required!",
        }),
        email: z
            .string({
            required_error: "an email is required!",
        })
            .email("Please enter a valid email address!"),
        photoURL: z.string({
            required_error: "A photo URL is required",
        }),
    }),
});
exports.editUser = z.object({
    body: z.object({
        username: z.string().optional(),
        password: z.string().optional(),
        email: z.string().email("Please enter a valid email address!").optional(),
    }),
});
exports.getUsersSchema = z.object({
    query: generalZodSchemas_1.querySchema,
});
exports.userIDSchema = z.object({
    params: z.object({
        userID: z.string(),
    }),
});
