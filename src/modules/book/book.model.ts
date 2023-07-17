import { Schema, Types, model } from "mongoose";
import { IGenericBook } from "./book.interface";

const bookSchema = new Schema<IGenericBook>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
});

const Book = model<IGenericBook>("book", bookSchema);

export const BookModel = { Book };
