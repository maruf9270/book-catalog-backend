import { ErrorRequestHandler, RequestHandler } from "express";
import config from "../../config";
import { IGenericErrorMessages } from "../../interfaces/errorMessages";
import Apierror from "../../error/apiError";
import { IGenericErrorResponse } from "../../interfaces/errorResponse";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Global error handler properties
  let statusCode: number | undefined = 500;
  let message: string = "Internal Server error";
  let errorMessages: IGenericErrorMessages[] = [];
  let stack = config.node_env !== "production" ? error?.stack : undefined;

  if (error instanceof Apierror) {
    message = error.name;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
    statusCode = error?.statusCode;
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  const errorObject: IGenericErrorResponse = {
    success: false,
    message: message,
    errorMessages: errorMessages,
    stack: stack,
    statusCode: statusCode,
  };

  res.status(statusCode).json(errorObject);
};

export const GlobalErrorHandler = { globalErrorHandler };
