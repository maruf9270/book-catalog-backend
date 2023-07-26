import { Schema, model } from "mongoose";
import { IGenericReadingList } from "./readingList.interface";

const readingListSchema = new Schema<IGenericReadingList>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  books: [
    {
      book: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "book",
      },
      status: {
        type: String,
        enum: ["reading", "read-soon", "finished"],
        required: true,
      },
    },
  ],
});

const ReadingList = model<IGenericReadingList>(
  "reading-list",
  readingListSchema
);

export const ReadingListModel = { ReadingList };
