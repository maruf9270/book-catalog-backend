import { IGenericErrorResponse } from "../interfaces/errorResponse";
import { Response } from "express";
import { IGenericResponse } from "../interfaces/responseInterface";

const responseSender = (res: Response, param: IGenericResponse) => {
  res.status(Number(param.statusCode)).json({
    success: param.success,
    message: param.message,
    statusCode: param.statusCode,
    data: param.data,
  });
};

export const ResponseSender = { responseSender };
