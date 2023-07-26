"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const atuh_routes_1 = require("../modules/auth/atuh.routes");
const book_routes_1 = require("../modules/book/book.routes");
const review_routes_1 = require("../modules/review/review.routes");
const wishlist_routes_1 = require("../modules/wishlist/wishlist.routes");
const readingList_routes_1 = require("../modules/readingList/readingList.routes");
const routes = express_1.default.Router();
// All auth routes
routes.use("/auth", atuh_routes_1.AuthRoutes.router);
// All routes for books
routes.use("/book", book_routes_1.BookRoutes.routes);
// All the routes for review
routes.use("/review", review_routes_1.ReviewRoutes.routes);
// Routes for wishlist
routes.use("/wishlist", wishlist_routes_1.WishListRoutes.routes);
// ROutes for reading list
routes.use("/reading-list", readingList_routes_1.ReadingListRoutes.routes);
exports.default = routes;
