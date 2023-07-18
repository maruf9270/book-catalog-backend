import { RequestHandler } from "express";
import { ReviewService } from "./review.service";
import { ResponseSender } from "../../shared/responseSender";
import httpStatus from "http-status";

const newReview: RequestHandler = async (req, res, next) => {
  try {
    const result = await ReviewService.postReview(req.body, req?.user?._id);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Review Posted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const ReviewController = { newReview };
