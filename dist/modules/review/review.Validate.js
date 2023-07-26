"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidate = void 0;
const zod_1 = require("zod");
const reviewValidate = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({ required_error: "Review is requrired" }),
        book: zod_1.z.string({ required_error: "Book id is requrired" }),
    }),
});
exports.ReviewValidate = { reviewValidate };
