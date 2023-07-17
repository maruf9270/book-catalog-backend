import { RequestHandler } from "express";
import { TokenVarifiyer } from "../../halper/tokenVarifiyer";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { UserFinder } from "../../halper/userFinder";
import Apierror from "../../error/apiError";
import httpStatus from "http-status";

const authChecker: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isTokenValid = TokenVarifiyer.tokenVarifiyer(
      token as string,
      config.auth_secret as Secret
    );
    const user = await UserFinder.userFinder(isTokenValid?._id);
    if (!user) {
      throw new Apierror(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to perform this action"
      );
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const AuthChecker = { authChecker };
