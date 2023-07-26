import { Types } from "mongoose";

export type IGenericReadingList = {
  books: IGenericReadingListBook[];
  user: Types.ObjectId;
  save: () => object;
};

type IGenericReadingListBook = {
  book: Types.ObjectId;
  status?: "reading" | "read-soon" | "finished";
};

export type IgenericChcngeStatus = {
  book: Types.ObjectId;
  status: "reading" | "read-soon" | "finished";
};
