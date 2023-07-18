import express from "express";
import { RequestValidator } from "../middlewares/requestValidator";
import { ReviewValidate } from "./review.Validate";
import { AuthValidator } from "../auth/auth.zodSchema";
import { AuthChecker } from "../middlewares/authChecker";
import { ReviewController } from "./review.controller";
const routes = express.Router();
// For posting review
routes.post(
  "/",
  RequestValidator.requestValidator(ReviewValidate.reviewValidate),
  AuthChecker.authChecker,
  ReviewController.newReview
);
export const ReviewRoutes = { routes };
