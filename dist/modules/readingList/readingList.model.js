"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListModel = void 0;
const mongoose_1 = require("mongoose");
const readingListSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    books: [
        {
            book: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "book",
            },
            status: {
                type: String,
                enum: ["reading", "read-soon", "finished"],
                required: true,
            },
        },
    ],
});
const ReadingList = (0, mongoose_1.model)("reading-list", readingListSchema);
exports.ReadingListModel = { ReadingList };
