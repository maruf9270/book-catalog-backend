import { RequestHandler } from "express";
import { AuthService } from "./auth.service";
import { ResponseSender } from "../../shared/responseSender";
import httpStatus from "http-status";

// Controller function for sign up
const signUp: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthService.postUser(req.body);
    ResponseSender.responseSender(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: "Signed Up successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = { signUp };
