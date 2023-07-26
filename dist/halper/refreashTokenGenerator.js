"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreashTokenGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const refreashTokenGenerator = (param) => {
    const refreashToken = jsonwebtoken_1.default.sign(param, config_1.default.refreash_secret, {
        expiresIn: config_1.default.refreash_expire,
    });
    return refreashToken;
};
exports.RefreashTokenGenerator = { refreashTokenGenerator };
