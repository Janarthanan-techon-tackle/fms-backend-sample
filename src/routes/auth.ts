import express from "express";
import validate, { ValidationSource } from "../middleware/validate";
import {
  forgotPassWordSchema,
  loginUserSchema,
  resetPassWordSchema,
  verifyForgotPassWordOtpSchema,
} from "../schema/auth";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/login",
  validate(loginUserSchema, ValidationSource.BODY),
  AuthController.loginUser
);

router.post(
  "/resetPassWord",
  validate(resetPassWordSchema, ValidationSource.BODY),
  AuthController.resetPassWord
);

router.post(
  "/verifyOtp",
  validate(verifyForgotPassWordOtpSchema, ValidationSource.BODY),
  AuthController.verifyForgotPassWordOtp
);

router.post(
  "/forgotPassWordSendOtp",
  validate(forgotPassWordSchema, ValidationSource.BODY),
  AuthController.forgotPassWord
);
router.post(
  "/verifyLoginOtp",
  validate(verifyForgotPassWordOtpSchema, ValidationSource.BODY),
  AuthController.verifyLoginOtp
);

export default router;
