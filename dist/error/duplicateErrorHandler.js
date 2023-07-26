"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateError = (error) => {
    const statusCode = http_status_1.default.CONFLICT;
    const message = "Duplicate error";
    const conflictPaths = Object.keys(error.keyPattern);
    const errorMessages = conflictPaths.map((path) => {
        return {
            path: path,
            message: `${path} already existes in our database`,
        };
    });
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.handleDuplicateError = handleDuplicateError;
