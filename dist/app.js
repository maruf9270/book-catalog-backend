"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = require("./modules/middlewares/globalErrorHandler");
const app = (0, express_1.default)();
// using cookie parser and cors and body parser
app.use("*", (0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// route handler
app.use("/api/v1", routes_1.default);
// test api
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});
// Global error handler
app.use(globalErrorHandler_1.GlobalErrorHandler.globalErrorHandler);
exports.default = app;
