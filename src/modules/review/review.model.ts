import { Schema, Types, model } from "mongoose";
import { IGenericReview } from "./review.interface";

const reviewSchema = new Schema<IGenericReview>(
  {
    review: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "book",
    },
  },
  {
    timestamps: true,
  }
);
const Review = model<IGenericReview>("review", reviewSchema);
export const ReviewModel = { Review };
