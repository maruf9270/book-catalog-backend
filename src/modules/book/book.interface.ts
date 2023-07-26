import { Types } from "mongoose";
import { IGenericAuth } from "../auth/auth.interface";

export type IGenericBook = {
  user: Types.ObjectId | IGenericAuth;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: {
    image: string;
    thumbnail: string;
  };
};

export type IGenericTokenInfo = {
  _id: Types.ObjectId | string;
  phoneNumber: string;
};

export type IGenericSearchTerm = {
  title: string;
  author: string;
  genre: string;
  searchTerm: string;
  publicationDate: string;
  shortBy: string;
  limit: string;
};
