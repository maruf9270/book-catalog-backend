"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSender = void 0;
const responseSender = (res, param) => {
    res.status(Number(param.statusCode)).json({
        success: param.success,
        message: param.message,
        statusCode: param.statusCode,
        data: param.data,
    });
};
exports.ResponseSender = { responseSender };
