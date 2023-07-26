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
exports.WishListService = void 0;
const mongodb_1 = require("mongodb");
const wishlist_model_1 = require("./wishlist.model");
const apiError_1 = __importDefault(require("../../error/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const postWishlist = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const doesExists = yield wishlist_model_1.WishlistModel.Wishlist.find({
        user: new mongodb_1.ObjectId(userId),
    });
    if (doesExists.length > 0) {
        if (doesExists[0].book.includes(bookId)) {
            throw new apiError_1.default(http_status_1.default.CONFLICT, "Book already exists on your wishlist");
        }
        const bookList = doesExists[0].book;
        const data = {
            book: bookList,
        };
        bookList.push(bookId);
        const result = yield wishlist_model_1.WishlistModel.Wishlist.findOneAndUpdate({ user: new mongodb_1.ObjectId(userId) }, data, {
            new: true,
        }).populate("book");
        return result;
    }
    const newWishlist = {
        user: userId,
        book: [bookId],
    };
    const result = yield wishlist_model_1.WishlistModel.Wishlist.create(newWishlist);
    return result;
});
// For removing a single book
const deleteBookFromWishlist = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const doesExists = yield wishlist_model_1.WishlistModel.Wishlist.find({
        user: new mongodb_1.ObjectId(userId),
    });
    if (!doesExists.length) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "No wishlist found");
    }
    const bookList = doesExists[0].book;
    if (bookList.includes(bookId)) {
        const result = yield wishlist_model_1.WishlistModel.Wishlist.updateOne({ user: userId }, { $pull: { book: new mongodb_1.ObjectId(bookId) } }, { new: true }).populate("book");
        return result;
    }
    throw new apiError_1.default(http_status_1.default.NOT_FOUND, "The book is not in the wishlist");
});
// FOr getting all the WishListController
const fetchWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.WishlistModel.Wishlist.findOne({
        user: new mongodb_1.ObjectId(userId),
    }).populate("book");
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "No wishlist found");
    }
    return result;
});
exports.WishListService = {
    postWishlist,
    deleteBookFromWishlist,
    fetchWishlist,
};
