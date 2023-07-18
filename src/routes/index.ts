import express, { Router } from "express";
import { AuthRoutes } from "../modules/auth/atuh.routes";
import { BookRoutes } from "../modules/book/book.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
const routes: Router = express.Router();
// All auth routes
routes.use("/auth", AuthRoutes.router);
// All routes for books
routes.use("/book", BookRoutes.routes);

// All the routes for review
routes.use("/review", ReviewRoutes.routes);

export default routes;
