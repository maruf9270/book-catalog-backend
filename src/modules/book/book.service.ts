import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import { TokenVarifiyer } from "../../halper/tokenVarifiyer";
import {
  IGenericBook,
  IGenericSearchTerm,
  IGenericTokenInfo,
} from "./book.interface";
import { UserFinder } from "../../halper/userFinder";
import { AuthModel } from "../auth/auth.model";
import { IGenericAuth } from "../auth/auth.interface";
import { BookModel } from "./book.model";
import { BookConstant } from "./book.constant";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import Apierror from "../../error/apiError";
import httpStatus from "http-status";

// Service function for adding new books
const postBook = async (
  param: Partial<IGenericBook>,
  user: Partial<IGenericAuth>
) => {
  const book = {
    user: user._id,
    ...param,
  };

  const result = (await BookModel.Book.create(book)).populate("user");
  return result;
};
// Service function for getting all the books
const fetchBooks = async (param: Partial<IGenericSearchTerm>) => {
  const { searchTerm, ...filterOptions } = param;
  let query: any = [];
  if (searchTerm) {
    query.push({
      $or: BookConstant.searchOptions.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }
  let filter: any = [];
  if (Object.keys(filterOptions).length >= 1) {
    query.push({
      $and: Object.entries(filterOptions).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const whereConditions = query.length > 0 ? { $and: query } : {};
  const result = await BookModel.Book.find(whereConditions);
  return result;
};
// service function for updating the books
const patchBooks = async (
  bookData: Partial<IGenericBook>,
  bookId: string,
  userId: Types.ObjectId
) => {
  const doesExists = await BookModel.Book.find({
    _id: new ObjectId(bookId),
    user: new ObjectId(userId),
  });
  if (!doesExists.length) {
    throw new Apierror(httpStatus.NOT_FOUND, "No book found to updated");
  }
  const result = await BookModel.Book.findOneAndUpdate(
    { _id: new ObjectId(bookId) },
    bookData,
    { new: true }
  ).populate("user");
  return result;
};

// for deleting book
const deleteBook = async (bookId: string, userId: Types.ObjectId) => {
  const doesExists = await BookModel.Book.find({
    _id: new ObjectId(bookId),
    user: new ObjectId(userId),
  });
  if (!doesExists.length) {
    throw new Apierror(httpStatus.NOT_FOUND, "No book found to delete");
  }
  const result = await BookModel.Book.findOneAndDelete({
    _id: new ObjectId(bookId),
  }).populate("user");
  return result;
};

// For single book
const singleGet = async (bookId: string) => {
  const result = await BookModel.Book.findById(bookId).populate("user");
  return result;
};
export const BookService = {
  postBook,
  fetchBooks,
  patchBooks,
  deleteBook,
  singleGet,
};
