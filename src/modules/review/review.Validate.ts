import { z } from "zod";

const reviewValidate = z.object({
  body: z.object({
    review: z.string({ required_error: "Review is requrired" }),
    book: z.string({ required_error: "Book id is requrired" }),
  }),
});
export const ReviewValidate = { reviewValidate };
