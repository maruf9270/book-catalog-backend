import { RequestHandler } from "express";
import { ReadingListService } from "./readingList.service";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { ResponseSender } from "../../shared/responseSender";
import httpStatus from "http-status";
import { date } from "zod";

const addToReadingList: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const result = await ReadingListService.postReadingList({
      user: userId,
      books: {
        book: req.body.book,
        status: req.body.status,
      },
    });

    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book added to reading list",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// for getting all the reading list
const getReadingList: RequestHandler = async (req, res, next) => {
  try {
    const id = req?.user?._id;
    const result = await ReadingListService.fetchReadingList(id);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reading List featched successfylly",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// For changing the book status
const changeStatus: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body, req?.user?._id);
    const result = await ReadingListService.changeStatus(
      req.body,
      req?.user?._id
    );
    ResponseSender.responseSender(res, {
      success: true,
      message: "Status changed successfylly",
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ReadingListController = {
  addToReadingList,
  getReadingList,
  changeStatus,
};
