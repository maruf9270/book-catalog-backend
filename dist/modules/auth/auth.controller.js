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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const responseSender_1 = require("../../shared/responseSender");
const http_status_1 = __importDefault(require("http-status"));
// Controller function for sign up
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.AuthService.postUser(req.body);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            data: result,
            message: "Signed Up successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
// Controller function for logging in
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.AuthService.login(req.body);
        res.cookie("user", result.refreashToken, { httpOnly: true });
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            message: "Logged in successfully",
            data: { accessToken: result.accessToken, user: result.user },
            statusCode: http_status_1.default.OK,
        });
    }
    catch (error) {
        next(error);
    }
});
// For generating new accessToken
const newAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.cookies.user;
        const result = yield auth_service_1.AuthService.accessToken(user);
        responseSender_1.ResponseSender.responseSender(res, {
            success: true,
            message: "User Information retrived successfully",
            statusCode: http_status_1.default.OK,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = { signUp, login, newAccessToken };
