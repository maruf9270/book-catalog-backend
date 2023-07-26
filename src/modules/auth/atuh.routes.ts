import express from "express";
import { RequestValidator } from "../middlewares/requestValidator";
import { AuthValidator } from "./auth.zodSchema";
import { AuthController } from "./auth.controller";
const router = express.Router();

// Route for sign up
router.post(
  "/sign-up",
  RequestValidator.requestValidator(AuthValidator.authVlaidator),
  AuthController.signUp
);

// Route for logging in
router.post(
  "/login",
  RequestValidator.requestValidator(AuthValidator.loginValidator),
  AuthController.login
);

// Route for generating auth Token and user info
router.post(
  "/refresh-token",
  RequestValidator.requestValidator(AuthValidator.tokenValidator),
  AuthController.newAccessToken
);

export const AuthRoutes = { router };
