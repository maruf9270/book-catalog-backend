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
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const responseSender_1 = require("../../shared/responseSender");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../shared/pick"));
const book_constant_1 = require("./book.constant");
// Controller function for adding new book
const newBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.postBook(req.body, req.user);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "New book Added successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller function for getting all the books
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchOptions = (0, pick_1.default)(req.query, book_constant_1.BookConstant.searchOptions);
        const result = yield book_service_1.BookService.fetchBooks(searchOptions);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: "Book data retrived successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller function for patching the book
const patchBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookData = req.body;
        const bookId = req.params.id;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        const result = yield book_service_1.BookService.patchBooks(bookData, bookId, userId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (error) { }
});
// For deleting book
const removeBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const bookId = req.params.id;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id;
        const result = yield book_service_1.BookService.deleteBook(bookId, userId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller for single book
const singleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const result = yield book_service_1.BookService.singleGet(bookId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book fetched succssfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    newBook,
    getBook,
    patchBook,
    removeBook,
    singleBook,
};
