import { AuthModel } from "../modules/auth/auth.model";

const userFinder = async (param: string) => {
  const user = await AuthModel.User.findOne({ _id: param });
  return user;
};

export const UserFinder = { userFinder };
