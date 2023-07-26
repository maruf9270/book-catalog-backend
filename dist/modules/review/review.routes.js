"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const requestValidator_1 = require("../middlewares/requestValidator");
const review_Validate_1 = require("./review.Validate");
const authChecker_1 = require("../middlewares/authChecker");
const review_controller_1 = require("./review.controller");
const routes = express_1.default.Router();
// For posting review
routes.post("/", requestValidator_1.RequestValidator.requestValidator(review_Validate_1.ReviewValidate.reviewValidate), authChecker_1.AuthChecker.authChecker, review_controller_1.ReviewController.newReview);
// for specific book review
routes.get("/:id", review_controller_1.ReviewController.specificBookReview);
exports.ReviewRoutes = { routes };
