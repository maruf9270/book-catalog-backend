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

// Routes patching a single book
routes.patch(
  "/:id",
  RequestValidator.requestValidator(BookValidator.patchValidate),
  AuthChecker.authChecker,
  BookController.patchBook
);
// Routes for deleting a book
routes.delete("/:id", AuthChecker.authChecker, BookController.removeBook);

// Routes for getting a specific book
routes.get("/:id", BookController.singleBook);
export const BookRoutes = { routes };
