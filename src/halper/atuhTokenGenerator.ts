import config from "../config";
import { IGenericAuth } from "../modules/auth/auth.interface";
import jwt, { Secret } from "jsonwebtoken";

const authTokenGenerator = (param: Partial<IGenericAuth>) => {
  const authToken = jwt.sign(param, config.auth_secret as Secret, {
    expiresIn: config.auth_expire,
  });
  return authToken;
};

export const AuthTokenGenerator = { authTokenGenerator };
