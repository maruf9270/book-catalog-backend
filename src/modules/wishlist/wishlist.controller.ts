import { RequestHandler } from "express";
import { WishListService } from "./wishlist.service";
import { ResponseSender } from "../../shared/responseSender";
import httpStatus from "http-status";
import { Types } from "mongoose";

// controller function for wishlist
const addToWishlist: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const bookId = req.params.bookId;
    const result = await WishListService.postWishlist(bookId, userId);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book has been added to your wishlist",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Remove
const removeBook: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user?._id;
    const result = await WishListService.deleteBookFromWishlist(
      bookId as unknown as Types.ObjectId,
      userId
    );
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book has been removed from wishlist",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// FOr getting a wishlist of person
const getAllWishlist: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const result = await WishListService.fetchWishlist(userId);
    ResponseSender.responseSender(res, {
      success: true,
      message: "Wishlist Featched successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const WishListController = { addToWishlist, removeBook, getAllWishlist };
