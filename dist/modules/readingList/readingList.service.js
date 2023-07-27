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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListService = void 0;
const mongodb_1 = require("mongodb");
const readingList_model_1 = require("./readingList.model");
const apiError_1 = __importDefault(require("../../error/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const postReadingList = (readingList) => __awaiter(void 0, void 0, void 0, function* () {
    const doesExist = yield readingList_model_1.ReadingListModel.ReadingList.findOne({
        user: new mongodb_1.ObjectId(readingList.user),
    });
    if (!doesExist) {
        const data = {
            user: new mongodb_1.ObjectId(readingList.user),
            books: [
                {
                    book: new mongodb_1.ObjectId(readingList.books.book),
                    status: readingList.books.status,
                },
            ],
        };
        const result = yield readingList_model_1.ReadingListModel.ReadingList.create(data);
        return result;
    }
    const doesBookExistsONReadingList = yield readingList_model_1.ReadingListModel.ReadingList.find({
        books: { $elemMatch: { book: new mongodb_1.ObjectId(readingList.books.book) } },
    });
    if (doesBookExistsONReadingList.length > 0) {
        throw new apiError_1.default(http_status_1.default.CONFLICT, "Book already exists on your reading list");
    }
    const result = yield readingList_model_1.ReadingListModel.ReadingList.updateOne({ user: readingList.user }, {
        $push: {
            books: {
                book: new mongodb_1.ObjectId(readingList.books.book),
                status: readingList.books.status,
            },
        },
    });
    return result;
});
// For getting all the reading list
const fetchReadingList = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readingList_model_1.ReadingListModel.ReadingList.find({
        user: new mongodb_1.ObjectId(id),
    }).populate({
        path: "books",
        populate: { path: "book" },
    });
    return result;
});
// CHange status
const changeStatus = (param, user) => __awaiter(void 0, void 0, void 0, function* () {
    const readingList = yield readingList_model_1.ReadingListModel.ReadingList.findOne({
        user: new mongodb_1.ObjectId(user),
    });
    const bookData = readingList === null || readingList === void 0 ? void 0 : readingList.books.find((book) => book.book._id.toString() === param.book.toString());
    if (bookData && readingList) {
        bookData.status = param.status;
        readingList.save();
    }
    return readingList;
});
exports.ReadingListService = {
    postReadingList,
    fetchReadingList,
    changeStatus,
};
