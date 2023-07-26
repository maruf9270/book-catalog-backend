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
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
const responseSender_1 = require("../../shared/responseSender");
const http_status_1 = __importDefault(require("http-status"));
const newReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield review_service_1.ReviewService.postReview(req.body, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Review Posted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
//get Reivews for specific book
const specificBookReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const result = yield review_service_1.ReviewService.fetchReview(bookId);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            message: "Review featched successfully",
            statusCode: http_status_1.default.OK,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ReviewController = { newReview, specificBookReview };
