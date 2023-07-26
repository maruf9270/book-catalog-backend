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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const book_constant_1 = require("./book.constant");
const mongodb_1 = require("mongodb");
const apiError_1 = __importDefault(require("../../error/apiError"));
const http_status_1 = __importDefault(require("http-status"));
// Service function for adding new books
const postBook = (param, user) => __awaiter(void 0, void 0, void 0, function* () {
    const book = Object.assign({ user: user._id }, param);
    const result = (yield book_model_1.BookModel.Book.create(book)).populate("user");
    return result;
});
// Service function for getting all the books
const fetchBooks = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = param, filterOptions = __rest(param, ["searchTerm"]);
    let query = [];
    if (searchTerm) {
        query.push({
            $or: book_constant_1.BookConstant.searchOptions.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }
    let filter = [];
    if (Object.keys(filterOptions).length >= 1) {
        query.push({
            $and: Object.entries(filterOptions).map(([field, value]) => {
                return { [field]: value };
            }),
        });
    }
    const whereConditions = query.length > 0 ? { $and: query } : {};
    const result = yield book_model_1.BookModel.Book.find(whereConditions);
    return result;
});
// service function for updating the books
const patchBooks = (bookData, bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const doesExists = yield book_model_1.BookModel.Book.find({
        _id: new mongodb_1.ObjectId(bookId),
        user: new mongodb_1.ObjectId(userId),
    });
    if (!doesExists.length) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "No book found to updated");
    }
    const result = yield book_model_1.BookModel.Book.findOneAndUpdate({ _id: new mongodb_1.ObjectId(bookId) }, bookData, { new: true }).populate("user");
    return result;
});
// for deleting book
const deleteBook = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const doesExists = yield book_model_1.BookModel.Book.find({
        _id: new mongodb_1.ObjectId(bookId),
        user: new mongodb_1.ObjectId(userId),
    });
    if (!doesExists.length) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "No book found to delete");
    }
    const result = yield book_model_1.BookModel.Book.findOneAndDelete({
        _id: new mongodb_1.ObjectId(bookId),
    }).populate("user");
    return result;
});
// For single book
const singleGet = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.BookModel.Book.findById(bookId).populate("user");
    return result;
});
exports.BookService = {
    postBook,
    fetchBooks,
    patchBooks,
    deleteBook,
    singleGet,
};
