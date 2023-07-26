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
exports.WishListController = void 0;
const wishlist_service_1 = require("./wishlist.service");
const responseSender_1 = require("../../shared/responseSender");
const http_status_1 = __importDefault(require("http-status"));
// controller function for wishlist
const addToWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const bookId = req.params.bookId;
        const result = yield wishlist_service_1.WishListService.postWishlist(bookId, userId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book has been added to your wishlist",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Remove
const removeBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const bookId = req.params.bookId;
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const result = yield wishlist_service_1.WishListService.deleteBookFromWishlist(bookId, userId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book has been removed from wishlist",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// FOr getting a wishlist of person
const getAllWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
        const result = yield wishlist_service_1.WishListService.fetchWishlist(userId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            message: "Wishlist Featched successfully",
            statusCode: http_status_1.default.OK,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.WishListController = { addToWishlist, removeBook, getAllWishlist };
