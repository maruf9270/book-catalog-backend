"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const requestValidator_1 = require("../middlewares/requestValidator");
const auth_zodSchema_1 = require("./auth.zodSchema");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// Route for sign up
router.post("/sign-up", requestValidator_1.RequestValidator.requestValidator(auth_zodSchema_1.AuthValidator.authVlaidator), auth_controller_1.AuthController.signUp);
// Route for logging in
router.post("/login", requestValidator_1.RequestValidator.requestValidator(auth_zodSchema_1.AuthValidator.loginValidator), auth_controller_1.AuthController.login);
// Route for logout
router.post("/logout", auth_controller_1.AuthController.logout);
// Route for generating auth Token and user info
router.post("/refresh-token", auth_controller_1.AuthController.newAccessToken);
exports.AuthRoutes = { router };
