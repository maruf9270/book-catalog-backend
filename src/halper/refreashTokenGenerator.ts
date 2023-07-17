import { ObjectId } from "mongoose";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import { IGenericAuth } from "../modules/auth/auth.interface";

const refreashTokenGenerator = (param: Partial<IGenericAuth>) => {
  const refreashToken = jwt.sign(param, config.refreash_secret as Secret, {
    expiresIn: config.refreash_expire,
  });

  return refreashToken;
};

export const RefreashTokenGenerator = { refreashTokenGenerator };
