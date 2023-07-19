import { Types } from "mongoose";
import { IGenericReview } from "./review.interface";
import { ReviewModel } from "./review.model";
import { ObjectId } from "mongodb";
import Apierror from "../../error/apiError";
import httpStatus from "http-status";

const postReview = async (review: IGenericReview, userId: Types.ObjectId) => {
  const doesReviewExists = await ReviewModel.Review.find({
    user: new ObjectId(userId),
    book: new ObjectId(review.book),
  });
  console.log(doesReviewExists);
  if (doesReviewExists.length > 0) {
    throw new Apierror(
      httpStatus.CONFLICT,
      "You have already reviewed the book"
    );
  }
  const reviewData = {
    user: userId,
    review: review.review,
    book: review.book,
  };
  const result = await (
    await (await ReviewModel.Review.create(reviewData)).populate("user")
  ).populate("book");
  return result;
};

// for specific book
const fetchReview = async (bookId: string) => {
  const result = await ReviewModel.Review.find({ book: new ObjectId(bookId) })
    .populate("user")
    .populate("book");
  return result;
};
export const ReviewService = { postReview, fetchReview };
