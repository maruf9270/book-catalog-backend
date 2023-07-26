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
exports.AuthChecker = void 0;
const tokenVarifiyer_1 = require("../../halper/tokenVarifiyer");
const config_1 = __importDefault(require("../../config"));
const userFinder_1 = require("../../halper/userFinder");
const apiError_1 = __importDefault(require("../../error/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const authChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const isTokenValid = tokenVarifiyer_1.TokenVarifiyer.tokenVarifiyer(token, config_1.default.auth_secret);
        const user = yield userFinder_1.UserFinder.userFinder(isTokenValid === null || isTokenValid === void 0 ? void 0 : isTokenValid._id);
        if (!user) {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to perform this action");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.AuthChecker = { authChecker };
