import express from "express";
import { RequestValidator } from "../middlewares/requestValidator";
import { BookValidator } from "./book.validate";
import { AuthValidator } from "../auth/auth.zodSchema";
import { AuthChecker } from "../middlewares/authChecker";
import { AuthController } from "../auth/auth.controller";
import { BookController } from "./book.controller";
const routes = express.Router();
// Routes for posting new books
routes.post(
  "/",
  RequestValidator.requestValidator(BookValidator.bookVlaidator),
  AuthChecker.authChecker,
  BookController.newBook
);

// Routes for getting all the books
routes.get("/", BookController.getBook);

export const BookRoutes = { routes };
