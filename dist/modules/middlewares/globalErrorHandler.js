"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../error/apiError"));
const duplicateErrorHandler_1 = require("../../error/duplicateErrorHandler");
const globalErrorHandler = (error, req, res, next) => {
    // Global error handler properties
    let statusCode = 500;
    let message = "Internal Server error";
    let errorMessages = [];
    let stack = config_1.default.node_env !== "production" ? error === null || error === void 0 ? void 0 : error.stack : undefined;
    if ((error === null || error === void 0 ? void 0 : error.code) == "11000") {
        const simplifiedError = (0, duplicateErrorHandler_1.handleDuplicateError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof apiError_1.default) {
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    const errorObject = {
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: stack,
        statusCode: statusCode,
    };
    res.status(statusCode).json(errorObject);
};
exports.GlobalErrorHandler = { globalErrorHandler };
