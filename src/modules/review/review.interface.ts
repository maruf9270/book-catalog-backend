import { Types } from "mongoose";

export type IGenericReview = {
  user: Types.ObjectId;
  review: string;
  book: Types.ObjectId;
};
