import asyncHandler from "../middleware/asyncHandler";
import AuthService from "../service/auth.service";
import ApiResponse from "../utils/apiResponse";
import { HttpError, HttpStatus } from "../utils/httpError";
import { Request, Response, NextFunction } from "express";

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = await AuthService.loginUser(req.body);
    if (!data) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Something went wrong"
      );
    }
    res.send({
      message: data.message,
      token: data.token,
      user: data.user,
      isOtpShouldBeVerifiedForLogin: data.isOtpShouldBeVerifiedForLogin,
    });
  } catch (err) {
    throw err;
  }
});

const forgotPassWord = asyncHandler(async (req: Request, res: Response) => {
  try {
    await AuthService.sendForgotPassWordOtp(req.body);
    ApiResponse.send(
      res,
      HttpStatus.OK.code,
      "Otp had been sent to the registered email successfully"
    );
  } catch (err) {
    throw err;
  }
});

const verifyForgotPassWordOtp = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      await AuthService.verifyForgotPassWordOtp(req.body.otp, req.body.email),
        ApiResponse.send(res, HttpStatus.OK.code, "Otp verified successfully");
    } catch (error) {
      throw error;
    }
  }
);

const resetPassWord = asyncHandler(async (req: Request, res: Response) => {
  try {
    await AuthService.resetPassWord(req.body.email, req.body.password);
    ApiResponse.send(res, HttpStatus.OK.code, "Password reset successfully");
  } catch (error) {
    throw error;
  }
});

const verifyLoginOtp = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = await AuthService.verifyLoginOtp(req.body.email, req.body.otp);
    res.send({
      message: data.message,
      token: data.token,
      user: data.user,
      isOtpShouldBeVerifiedForLogin: data.isOtpShouldBeVerifiedForLogin,
    });
  } catch (error) {
    throw error;
  }
});
const AuthController = {
  loginUser,
  forgotPassWord,
  verifyForgotPassWordOtp,
  resetPassWord,
  verifyLoginOtp,
};

export default AuthController;
