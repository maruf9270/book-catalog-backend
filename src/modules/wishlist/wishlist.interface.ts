import { Types } from "mongoose";

export type IGenericWishlist = {
  user: Types.ObjectId;
  book: Types.ObjectId[];
};
