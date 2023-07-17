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
  );
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

  return {
    refreashToken,
    accessToken,
  };
};
export const AuthService = { postUser, login };
