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

// Controller function for logging in
const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.cookie("user", result.refreashToken, { httpOnly: true });
    ResponseSender.responseSender(res, {
      success: true,
      message: "Logged in successfully",
      data: { accessToken: result.accessToken },
      statusCode: httpStatus.OK,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = { signUp, login };
