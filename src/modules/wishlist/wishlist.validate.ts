import { z } from "zod";

const wishlistValidator = z.object({
  params: z.object({
    bookId: z.string({ required_error: "Book id is required" }),
  }),
});

export const WishlistValidator = { wishlistValidator };
