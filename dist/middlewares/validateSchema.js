"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../utils/CustomError");
function validate(schema) {
    return function (req, res, next) {
        try {
            const result = schema.safeParse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            if (result.error) {
                const errorMessage = JSON.parse(result.error.message).map((el) => el.message);
                throw new CustomError_1.CustomError(errorMessage.toString(), 400);
            }
            return next();
        }
        catch (e) {
            return next(e);
        }
    };
}
exports.default = validate;
