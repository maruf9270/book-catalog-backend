import { RequestHandler } from "express";
import { BookService } from "./book.service";
import { ResponseSender } from "../../shared/responseSender";
import httpStatus from "http-status";
import { IGenericAuth } from "../auth/auth.interface";

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
export const BookController = { newBook };
