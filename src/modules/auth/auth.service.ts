import { IGenericAuth } from "./auth.interface";
import { AuthModel } from "./auth.model";

// Service function for posting user
const postUser = async (param: IGenericAuth) => {
  const result = await AuthModel.User.create(param);
  return result;
};

export const AuthService = { postUser };
