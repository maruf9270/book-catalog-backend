"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenVarifiyer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../error/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const tokenVarifiyer = (token, secret) => {
    try {
        const result = jsonwebtoken_1.default.verify(token, secret);
        return result;
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to do the action");
    }
};
exports.TokenVarifiyer = { tokenVarifiyer };
