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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../error/apiError"));
const auth_model_1 = require("./auth.model");
const paswrodChecker_1 = require("../../halper/paswrodChecker");
const refreashTokenGenerator_1 = require("../../halper/refreashTokenGenerator");
const mongodb_1 = require("mongodb");
const atuhTokenGenerator_1 = require("../../halper/atuhTokenGenerator");
const tokenVarifiyer_1 = require("../../halper/tokenVarifiyer");
const config_1 = __importDefault(require("../../config"));
// Service function for posting user
const postUser = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.AuthModel.User.create(param);
    return result;
});
// service function for logging in
const login = (param) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(param);
    const doesUserExists = yield auth_model_1.AuthModel.User.findOne({
        phoneNumber: param.phoneNumber,
    }, { password: 1, phoneNumber: 1 }).select("+password");
    if (!doesUserExists) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Invalid phoneNumber");
    }
    const doesPasswordMatch = yield paswrodChecker_1.PasswordChecker.passwordChecker(param.password, doesUserExists.password);
    const refreashToken = refreashTokenGenerator_1.RefreashTokenGenerator.refreashTokenGenerator({
        _id: doesUserExists._id,
        phoneNumber: doesUserExists.phoneNumber,
    });
    const accessToken = atuhTokenGenerator_1.AuthTokenGenerator.authTokenGenerator({
        _id: doesUserExists._id,
        phoneNumber: doesUserExists.phoneNumber,
    });
    const user = yield auth_model_1.AuthModel.User.findOne({
        phoneNumber: param.phoneNumber,
    });
    return {
        refreashToken,
        accessToken,
        user: user,
    };
});
// For user access
const accessToken = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const varifiedToken = tokenVarifiyer_1.TokenVarifiyer.tokenVarifiyer(param, config_1.default.refreash_secret);
    const doesUserExists = yield auth_model_1.AuthModel.User.findOne({
        _id: new mongodb_1.ObjectId(varifiedToken === null || varifiedToken === void 0 ? void 0 : varifiedToken._id),
        phoneNumber: varifiedToken === null || varifiedToken === void 0 ? void 0 : varifiedToken.phoneNumber,
    });
    if (!doesUserExists) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    const accessToken = atuhTokenGenerator_1.AuthTokenGenerator.authTokenGenerator({
        _id: doesUserExists === null || doesUserExists === void 0 ? void 0 : doesUserExists._id,
        phoneNumber: doesUserExists === null || doesUserExists === void 0 ? void 0 : doesUserExists.phoneNumber,
    });
    return {
        accessToken: accessToken,
        user: doesUserExists,
    };
});
exports.AuthService = { postUser, login, accessToken };
