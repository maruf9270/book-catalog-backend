"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    image: {
        image: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
    },
}, { timestamps: true });
const Book = (0, mongoose_1.model)("book", bookSchema);
exports.BookModel = { Book };
