import { RequestHandler } from "express";
import { BookService } from "./book.service";
import { ResponseSender } from "../../shared/responseSender";
import httpStatus from "http-status";
import { IGenericAuth } from "../auth/auth.interface";
import pick from "../../shared/pick";
import { BookConstant } from "./book.constant";

// Controller function for adding new book
const newBook: RequestHandler = async (req, res, next) => {
  try {
    const result = await BookService.postBook(
      req.body,
      req.user as Partial<IGenericAuth>
    );

    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New book Added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller function for getting all the books
const getBook: RequestHandler = async (req, res, next) => {
  try {
    const searchOptions = pick(req.query, BookConstant.searchOptions);
    const result = await BookService.fetchBooks(searchOptions);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: "Book data retrived successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Controller function for patching the book
const patchBook: RequestHandler = async (req, res, next) => {
  try {
    const bookData = req.body;
    const bookId = req.params.id;
    const userId = req?.user?._id;
    const result = await BookService.patchBooks(bookData, bookId, userId);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error) {}
};

// For deleting book
const removeBook: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req?.user?._id;
    const result = await BookService.deleteBook(bookId, userId);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for single book
const singleBook: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const result = await BookService.singleGet(bookId);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book fetched succssfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const BookController = {
  newBook,
  getBook,
  patchBook,
  removeBook,
  singleBook,
};
