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
exports.ReviewService = void 0;
const review_model_1 = require("./review.model");
const mongodb_1 = require("mongodb");
const apiError_1 = __importDefault(require("../../error/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const postReview = (review, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const doesReviewExists = yield review_model_1.ReviewModel.Review.find({
        user: new mongodb_1.ObjectId(userId),
        book: new mongodb_1.ObjectId(review.book),
    });
    console.log(doesReviewExists);
    if (doesReviewExists.length > 0) {
        throw new apiError_1.default(http_status_1.default.CONFLICT, "You have already reviewed the book");
    }
    const reviewData = {
        user: userId,
        review: review.review,
        book: review.book,
    };
    const result = yield (yield (yield review_model_1.ReviewModel.Review.create(reviewData)).populate("user")).populate("book");
    return result;
});
// for specific book
const fetchReview = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.ReviewModel.Review.find({ book: new mongodb_1.ObjectId(bookId) })
        .populate("user")
        .populate("book");
    return result;
});
exports.ReviewService = { postReview, fetchReview };
