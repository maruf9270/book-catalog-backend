"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authChecker_1 = require("../middlewares/authChecker");
const readingList_contrller_1 = require("./readingList.contrller");
const routes = express_1.default.Router();
// for adding new readin list
routes.post("/", authChecker_1.AuthChecker.authChecker, readingList_contrller_1.ReadingListController.addToReadingList);
// for getting the reading list
routes.get("/", authChecker_1.AuthChecker.authChecker, readingList_contrller_1.ReadingListController.getReadingList);
// Change reading list status
routes.patch("/", authChecker_1.AuthChecker.authChecker, readingList_contrller_1.ReadingListController.changeStatus);
exports.ReadingListRoutes = { routes };
