import { Schema, model } from "mongoose";
import { IGenericAuth } from "./auth.interface";
import { NextFunction } from "express";
import bcrypt from "bcrypt";
import config from "../../config";
import Apierror from "../../error/apiError";
import httpStatus from "http-status";

const authSchema = new Schema<IGenericAuth>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hasing the passwor before hasing
authSchema.pre("save", async function (next) {
  const user = this;
  const upperCasedEmail =
    user.email.charAt(0).toUpperCase() + user.email.slice(1).toLowerCase();
  const givenPassword = user.password;
  const hashedPasswrod = await bcrypt.hash(
    givenPassword,
    Number(config.salt_rounds)
  );
  user.password = hashedPasswrod;
  user.email = upperCasedEmail;
  next();
});

const User = model<IGenericAuth>("User", authSchema);
export const AuthModel = { User };
