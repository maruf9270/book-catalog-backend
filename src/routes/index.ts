import express, { Router } from "express";
import { AuthRoutes } from "../modules/auth/atuh.routes";
const routes: Router = express.Router();
// All auth routes
routes.use("/auth", AuthRoutes.router);

export default routes;
