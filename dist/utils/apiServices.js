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
exports.API = void 0;
class API {
    constructor(query) {
        this.query = query;
    }
    filter(filters) {
        this.query.find(filters);
        return this;
    }
    sort(sort) {
        const sortBy = sort || "-createdAt";
        this.query.sort(sortBy);
        return this;
    }
    limit(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const numberOfPages = page || 0;
            const limitItems = limit || 10;
            const numberOfSkippedItems = numberOfPages * limitItems;
            const cloneQuery = yield this.query.clone();
            this.query.skip(numberOfSkippedItems).limit(limitItems);
            return { this: this, totalLength: cloneQuery.length };
        });
    }
}
exports.API = API;
