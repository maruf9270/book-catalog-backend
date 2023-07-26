import express from "express";
import { AuthChecker } from "../middlewares/authChecker";
import { ReadingListController } from "./readingList.contrller";
import { AuthController } from "../auth/auth.controller";

const routes = express.Router();
// for adding new readin list
routes.post(
  "/",
  AuthChecker.authChecker,
  ReadingListController.addToReadingList
);
// for getting the reading list
routes.get("/", AuthChecker.authChecker, ReadingListController.getReadingList);
// Change reading list status
routes.patch("/", AuthChecker.authChecker, ReadingListController.changeStatus);
export const ReadingListRoutes = { routes };
