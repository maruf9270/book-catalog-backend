import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import Apierror from "../error/apiError";
import httpStatus from "http-status";
import { Types } from "mongoose";
const tokenVarifiyer = (token: string, secret: Secret) => {
  try {
    const result = jwt.verify(token, secret);
    return result as JwtPayload;
  } catch (error) {
    throw new Apierror(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to do the action"
    );
  }
};

export const TokenVarifiyer = { tokenVarifiyer };
