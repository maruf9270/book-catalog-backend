"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidator = void 0;
const zod_1 = require("zod");
const bookVlaidator = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }),
        author: zod_1.z.string({ required_error: "Author is required" }),
        genre: zod_1.z.string({ required_error: "Genre is required" }),
        publicationDate: zod_1.z.string({
            required_error: "Publication Date is required",
        }),
    }),
});
const patchValidate = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }).optional(),
        author: zod_1.z.string({ required_error: "Author is required" }).optional(),
        genre: zod_1.z.string({ required_error: "Genre is required" }).optional(),
        publicationDate: zod_1.z
            .string({
            required_error: "Publication Date is required",
        })
            .optional(),
    }),
});
exports.BookValidator = { bookVlaidator, patchValidate };
