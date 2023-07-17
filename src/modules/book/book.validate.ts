import { z } from "zod";

const bookVlaidator = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    author: z.string({ required_error: "Author is required" }),
    genre: z.string({ required_error: "Genre is required" }),
    publicationDate: z.string({
      required_error: "Publication Date is required",
    }),
  }),
});

export const BookValidator = { bookVlaidator };