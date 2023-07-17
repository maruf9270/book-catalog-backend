import { Types } from "mongoose";
import { IGenericAuth } from "../auth/auth.interface";

export type IGenericBook = {
  user: Types.ObjectId | IGenericAuth;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};

export type IGenericTokenInfo = {
  _id: Types.ObjectId | string;
  phoneNumber: string;
};
