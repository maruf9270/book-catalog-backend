import { ObjectId } from "mongodb";
import {
  IGenericReadingList,
  IgenericChcngeStatus,
} from "./readingList.interface";
import { ReadingListModel } from "./readingList.model";
import { Types } from "mongoose";
import Apierror from "../../error/apiError";
import httpStatus from "http-status";

const postReadingList = async (readingList: {
  user: string;
  books: { book: Types.ObjectId; status: string };
}) => {
  const doesExist = await ReadingListModel.ReadingList.findOne({
    user: new ObjectId(readingList.user),
  });
  if (!doesExist) {
    const data = {
      user: new ObjectId(readingList.user),
      books: [
        {
          book: new ObjectId(readingList.books.book),
          status: readingList.books.status,
        },
      ],
    };
    const result = await ReadingListModel.ReadingList.create(data);
    return result;
  }
  const doesBookExistsONReadingList = await ReadingListModel.ReadingList.find({
    books: { $elemMatch: { book: new ObjectId(readingList.books.book) } },
  });

  if (doesBookExistsONReadingList.length > 0) {
    throw new Apierror(
      httpStatus.CONFLICT,
      "Book already exists on your reading list"
    );
  }
  const result = await ReadingListModel.ReadingList.updateOne(
    { user: readingList.user },
    {
      $push: {
        books: {
          book: new ObjectId(readingList.books.book),
          status: readingList.books.status,
        },
      },
    }
  );
  return result;
};

// For getting all the reading list
const fetchReadingList = async (id: string) => {
  const result = await ReadingListModel.ReadingList.find({
    user: new ObjectId(id),
  }).populate({
    path: "books",
    populate: { path: "book" },
  });
  return result;
};

// CHange status
const changeStatus = async (param: IgenericChcngeStatus, user: string) => {
  const readingList: IGenericReadingList | null =
    await ReadingListModel.ReadingList.findOne({
      user: new ObjectId(user),
    });

  const bookData = readingList?.books.find(
    (book) => book.book._id.toString() === param.book.toString()
  );

  if (bookData && readingList) {
    bookData.status = param.status;
    readingList.save();
  }

  return readingList;
};

export const ReadingListService = {
  postReadingList,
  fetchReadingList,
  changeStatus,
};
