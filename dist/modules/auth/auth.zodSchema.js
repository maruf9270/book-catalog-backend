"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const authVlaidator = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: "Name is required" }),
        email: zod_1.default.string({ required_error: "Email is required" }),
        phoneNumber: zod_1.default.string({ required_error: "Phone number is required" }),
        password: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
const loginValidator = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string({ required_error: "Phone number is required" }),
        password: zod_1.default.string({ required_error: "Password is required" }),
    }),
});
const tokenValidator = zod_1.default.object({
    cookies: zod_1.default.object({
        user: zod_1.default.string({ required_error: "Cookie is required" }),
    }),
});
exports.AuthValidator = { authVlaidator, loginValidator, tokenValidator };
