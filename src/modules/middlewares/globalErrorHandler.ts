import { ErrorRequestHandler, RequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.send(error);
};

export const GlobalErrorHandler = { globalErrorHandler };
