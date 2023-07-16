import { Schema, model } from "mongoose";
import { IGenericAuth } from "./auth.interface";
import { NextFunction } from "express";
import bcrypt from "bcrypt";
import config from "../../config";

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
    select: 0,
  },
});

// hasing the passwor before hasing
authSchema.pre("save", async function (next) {
  const user = this;
  const givenPassword = user.password;
  const hashedPasswrod = await bcrypt.hash(
    givenPassword,
    Number(config.salt_rounds)
  );
  user.password = hashedPasswrod;
  next();
});

const User = model<IGenericAuth>("User", authSchema);
export const AuthModel = { User };
