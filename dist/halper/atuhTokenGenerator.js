"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenGenerator = void 0;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authTokenGenerator = (param) => {
    const authToken = jsonwebtoken_1.default.sign(param, config_1.default.auth_secret, {
        expiresIn: config_1.default.auth_expire,
    });
    return authToken;
};
exports.AuthTokenGenerator = { authTokenGenerator };
