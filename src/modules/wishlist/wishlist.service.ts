import { ObjectId } from "mongodb";
import { WishlistModel } from "./wishlist.model";
import Apierror from "../../error/apiError";
import httpStatus from "http-status";
import { Types } from "mongoose";

const postWishlist = async (bookId: string, userId: string) => {
  const doesExists = await WishlistModel.Wishlist.find({
    user: new ObjectId(userId),
  });
  if (doesExists.length > 0) {
    if (doesExists[0].book.includes(bookId as unknown as Types.ObjectId)) {
      throw new Apierror(
        httpStatus.CONFLICT,
        "Book already exists on your wishlist"
      );
    }
    const bookList = doesExists[0].book;
    const data = {
      book: bookList,
    };
    bookList.push(bookId as unknown as Types.ObjectId);

    const result = await WishlistModel.Wishlist.findOneAndUpdate(
      { user: new ObjectId(userId) },
      data,
      {
        new: true,
      }
    ).populate("book");
    return result;
  }

  const newWishlist = {
    user: userId,
    book: [bookId],
  };
  const result = await WishlistModel.Wishlist.create(newWishlist);
  return result;
};

// For removing a single book
const deleteBookFromWishlist = async (
  bookId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const doesExists = await WishlistModel.Wishlist.find({
    user: new ObjectId(userId),
  });
  if (!doesExists.length) {
    throw new Apierror(httpStatus.NOT_FOUND, "No wishlist found");
  }
  const bookList = doesExists[0].book;
  if (bookList.includes(bookId)) {
    const result = await WishlistModel.Wishlist.updateOne(
      { user: userId },
      { $pull: { book: new ObjectId(bookId) } },
      { new: true }
    ).populate("book");
    return result;
  }
  throw new Apierror(httpStatus.NOT_FOUND, "The book is not in the wishlist");
};

// FOr getting all the WishListController
const fetchWishlist = async (userId: Types.ObjectId) => {
  const result = await WishlistModel.Wishlist.findOne({
    user: new ObjectId(userId),
  }).populate("book");
  if (!result) {
    throw new Apierror(httpStatus.NOT_FOUND, "No wishlist found");
  }
  return result;
};

export const WishListService = {
  postWishlist,
  deleteBookFromWishlist,
  fetchWishlist,
};
