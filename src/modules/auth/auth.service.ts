import httpStatus from "http-status";
import Apierror from "../../error/apiError";
import {
  IGenericAuth,
  IGenericLogin,
  IgenericLoginRespone,
} from "./auth.interface";
import { AuthModel } from "./auth.model";
import { PasswordChecker } from "../../halper/paswrodChecker";
import { RefreashTokenGenerator } from "../../halper/refreashTokenGenerator";
import { ObjectId } from "mongodb";
import { AuthTokenGenerator } from "../../halper/atuhTokenGenerator";
import { TokenVarifiyer } from "../../halper/tokenVarifiyer";
import config from "../../config";
import { Secret } from "jsonwebtoken";

// Service function for posting user
const postUser = async (param: IGenericAuth) => {
  const result = await AuthModel.User.create(param);
  return result;
};

// service function for logging in
const login = async (param: IGenericLogin): Promise<IgenericLoginRespone> => {
  console.log(param);
  const doesUserExists = await AuthModel.User.findOne(
    {
      phoneNumber: param.phoneNumber,
    },
    { password: 1, phoneNumber: 1 }
  ).select("+password");
  if (!doesUserExists) {
    throw new Apierror(httpStatus.NOT_FOUND, "Invalid phoneNumber");
  }
  const doesPasswordMatch = await PasswordChecker.passwordChecker(
    param.password,
    doesUserExists.password
  );
  const refreashToken = RefreashTokenGenerator.refreashTokenGenerator({
    _id: doesUserExists._id,
    phoneNumber: doesUserExists.phoneNumber,
  });
  const accessToken = AuthTokenGenerator.authTokenGenerator({
    _id: doesUserExists._id,
    phoneNumber: doesUserExists.phoneNumber,
  });

  const user = await AuthModel.User.findOne({
    phoneNumber: param.phoneNumber,
  });

  return {
    refreashToken,
    accessToken,
    user: user as IGenericAuth,
  };
};

// For user access
const accessToken = async (param: string) => {
  const varifiedToken = TokenVarifiyer.tokenVarifiyer(
    param,
    config.refreash_secret as Secret
  );
  const doesUserExists = await AuthModel.User.findOne({
    _id: new ObjectId(varifiedToken?._id),
    phoneNumber: varifiedToken?.phoneNumber,
  });
  if (!doesUserExists) {
    throw new Apierror(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const accessToken = AuthTokenGenerator.authTokenGenerator({
    _id: doesUserExists?._id,
    phoneNumber: doesUserExists?.phoneNumber,
  });

  return {
    accessToken: accessToken,
    user: doesUserExists,
  };
};
export const AuthService = { postUser, login, accessToken };
