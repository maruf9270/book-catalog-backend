"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authChecker_1 = require("../middlewares/authChecker");
const wishlist_controller_1 = require("./wishlist.controller");
const requestValidator_1 = require("../middlewares/requestValidator");
const wishlist_validate_1 = require("./wishlist.validate");
const routes = express_1.default.Router();
// Route for adding a book to the wishlist
routes.post("/:bookId", requestValidator_1.RequestValidator.requestValidator(wishlist_validate_1.WishlistValidator.wishlistValidator), authChecker_1.AuthChecker.authChecker, wishlist_controller_1.WishListController.addToWishlist);
// Route for removing an item form wishlist
routes.patch("/:bookId", requestValidator_1.RequestValidator.requestValidator(wishlist_validate_1.WishlistValidator.wishlistValidator), authChecker_1.AuthChecker.authChecker, wishlist_controller_1.WishListController.removeBook);
// ROutes to get a wishlist
routes.get("/", authChecker_1.AuthChecker.authChecker, wishlist_controller_1.WishListController.getAllWishlist);
exports.WishListRoutes = { routes };
