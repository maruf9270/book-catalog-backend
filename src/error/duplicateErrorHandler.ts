import httpStatus from "http-status";
import { IGenericErrorMessages } from "../interfaces/errorMessages";

export const handleDuplicateError = (error: any) => {
  const statusCode = httpStatus.CONFLICT;
  const message = "Duplicate error";
  const conflictPaths = Object.keys(error.keyPattern);
  const errorMessages: IGenericErrorMessages[] = conflictPaths.map((path) => {
    return {
      path: path,
      message: `${path} already existes in our database`,
    };
  });
  return {
    statusCode,
    message,
    errorMessages,
  };
};
