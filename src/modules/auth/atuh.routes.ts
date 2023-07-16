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

export const AuthRoutes = { router };
