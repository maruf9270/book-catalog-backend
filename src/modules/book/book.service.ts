import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";
import { TokenVarifiyer } from "../../halper/tokenVarifiyer";
import { IGenericBook, IGenericTokenInfo } from "./book.interface";
import { UserFinder } from "../../halper/userFinder";
import { AuthModel } from "../auth/auth.model";
import { IGenericAuth } from "../auth/auth.interface";
import { BookModel } from "./book.model";

// Service function for adding new books
const postBook = async (
  param: Partial<IGenericBook>,
  user: Partial<IGenericAuth>
) => {
  const book = {
    user: user._id,
    ...param,
  };

  const result = (await BookModel.Book.create(book)).populate("user");
  return result;
};

export const BookService = { postBook };
