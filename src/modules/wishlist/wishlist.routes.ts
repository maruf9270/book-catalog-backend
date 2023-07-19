import express from "express";
import { AuthChecker } from "../middlewares/authChecker";
import { WishListController } from "./wishlist.controller";
import { RequestValidator } from "../middlewares/requestValidator";
import { WishlistValidator } from "./wishlist.validate";
const routes = express.Router();

// Route for adding a book to the wishlist
routes.post(
  "/:bookId",
  RequestValidator.requestValidator(WishlistValidator.wishlistValidator),
  AuthChecker.authChecker,
  WishListController.addToWishlist
);

// Route for removing an item form wishlist
routes.patch(
  "/:bookId",
  RequestValidator.requestValidator(WishlistValidator.wishlistValidator),
  AuthChecker.authChecker,
  WishListController.removeBook
);

// ROutes to get a wishlist
routes.get("/", AuthChecker.authChecker, WishListController.getAllWishlist);

export const WishListRoutes = { routes };
