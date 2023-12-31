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
exports.ReadingListController = void 0;
const readingList_service_1 = require("./readingList.service");
const responseSender_1 = require("../../shared/responseSender");
const http_status_1 = __importDefault(require("http-status"));
const addToReadingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const result = yield readingList_service_1.ReadingListService.postReadingList({
            user: userId,
            books: {
                book: req.body.book,
                status: req.body.status,
            },
        });
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Book added to reading list",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// for getting all the reading list
const getReadingList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id;
        const result = yield readingList_service_1.ReadingListService.fetchReadingList(id);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Reading List featched successfylly",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// For changing the book status
const changeStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        console.log(req.body, (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id);
        const result = yield readingList_service_1.ReadingListService.changeStatus(req.body, (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d._id);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            message: "Status changed successfylly",
            statusCode: http_status_1.default.OK,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ReadingListController = {
    addToReadingList,
    getReadingList,
    changeStatus,
};
