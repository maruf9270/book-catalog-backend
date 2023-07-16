import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { GlobalErrorHandler } from "./modules/middlewares/globalErrorHandler";
const app: Application = express();

// using cookie parser and cors and body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route handler
app.use("api/v1", routes);

// Global error handler
app.use(GlobalErrorHandler.globalErrorHandler);
export default app;
