import express, { Router } from "express";
import { AuthRoutes } from "../modules/auth/atuh.routes";
import { BookRoutes } from "../modules/book/book.routes";
const routes: Router = express.Router();
// All auth routes
routes.use("/auth", AuthRoutes.router);
// All routes for books
routes.use("/book", BookRoutes.routes);

export default routes;
