"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidator = void 0;
const zod_1 = require("zod");
const wishlistValidator = zod_1.z.object({
    params: zod_1.z.object({
        bookId: zod_1.z.string({ required_error: "Book id is required" }),
    }),
});
exports.WishlistValidator = { wishlistValidator };
