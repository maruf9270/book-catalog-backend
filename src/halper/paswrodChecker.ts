import bcrypt from "bcrypt";
import Apierror from "../error/apiError";
import httpStatus from "http-status";
const passwordChecker = async (passwrod: string, hashedPasswrod: string) => {
  console.log(passwrod, hashedPasswrod);
  const result = await bcrypt.compare(passwrod, hashedPasswrod);
  if (!result) {
    throw new Apierror(httpStatus.UNAUTHORIZED, "Passwrod is incorrect");
  }
  return result;
};

export const PasswordChecker = { passwordChecker };
