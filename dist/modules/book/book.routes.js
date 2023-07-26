"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const requestValidator_1 = require("../middlewares/requestValidator");
const book_validate_1 = require("./book.validate");
const authChecker_1 = require("../middlewares/authChecker");
const book_controller_1 = require("./book.controller");
const routes = express_1.default.Router();
// Routes for posting new books
routes.post("/", requestValidator_1.RequestValidator.requestValidator(book_validate_1.BookValidator.bookVlaidator), authChecker_1.AuthChecker.authChecker, book_controller_1.BookController.newBook);
// Routes for getting all the books
routes.get("/", book_controller_1.BookController.getBook);
// Routes patching a single book
routes.patch("/:id", requestValidator_1.RequestValidator.requestValidator(book_validate_1.BookValidator.patchValidate), authChecker_1.AuthChecker.authChecker, book_controller_1.BookController.patchBook);
// Routes for deleting a book
routes.delete("/:id", authChecker_1.AuthChecker.authChecker, book_controller_1.BookController.removeBook);
// Routes for getting a specific book
routes.get("/:id", book_controller_1.BookController.singleBook);
exports.BookRoutes = { routes };
