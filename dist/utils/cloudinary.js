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
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function uploadToCloudinary(file, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = "data:" + file.mimetype + ";base64," + b64;
            const result = yield cloudinary_1.v2.uploader.upload(dataURI, options);
            return result;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.uploadToCloudinary = uploadToCloudinary;
function deleteFromCloudinary(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield cloudinary_1.v2.uploader.destroy(id);
        }
        catch (e) {
            throw e;
        }
    });
}
exports.deleteFromCloudinary = deleteFromCloudinary;
