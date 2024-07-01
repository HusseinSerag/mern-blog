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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = void 0;
const comment_model_1 = require("../models/comment.model");
const apiServices_1 = require("../utils/apiServices");
function getComments(query, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, page, sort, fields } = query, rest = __rest(query, ["limit", "page", "sort", "fields"]);
            const { search } = rest, restFields = __rest(rest, ["search"]);
            const api = new apiServices_1.API(comment_model_1.Comment.find(Object.assign({}, filter)).populate({
                path: "user",
                select: "username photoURL _id",
            }));
            api.sort(sort);
            const { totalLength } = yield api.limit(page, limit);
            const comments = yield api.query;
            return {
                totalCount: totalLength,
                comments: comments,
            };
        }
        catch (e) {
            throw e;
        }
    });
}
exports.getComments = getComments;
