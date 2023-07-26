import express, { Router } from "express";
import { AuthRoutes } from "../modules/auth/atuh.routes";
import { BookRoutes } from "../modules/book/book.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { WishListRoutes } from "../modules/wishlist/wishlist.routes";
import { ReadingListRoutes } from "../modules/readingList/readingList.routes";
const routes: Router = express.Router();
// All auth routes
routes.use("/auth", AuthRoutes.router);
// All routes for books
routes.use("/book", BookRoutes.routes);

// All the routes for review
routes.use("/review", ReviewRoutes.routes);

// Routes for wishlist
routes.use("/wishlist", WishListRoutes.routes);

// ROutes for reading list
routes.use("/reading-list", ReadingListRoutes.routes);
export default routes;
