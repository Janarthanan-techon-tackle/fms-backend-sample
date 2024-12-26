import AuthRepository from "../repository/auth.repository";

import bcrypt from "bcrypt";
import { HttpError, HttpStatus } from "../utils/httpError";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { generateOTP } from "../utils/generateOtp";
import { sendEmail } from "../utils/sendEmail";
import hashPassWord from "../utils/hashedPassWord";

const loginUser = async (user: any) => {
  if (user.password != null) {
    // Fetch user details along with the hashed password
    const userDetailsWithPassWord: any =
      await AuthRepository.getUserDetailsWithPassWordByEmail(user.email);
    if (!userDetailsWithPassWord) {
      throw new HttpError(HttpStatus.BAD_REQUEST, "User is not found");
    }
    const userDetails = userDetailsWithPassWord.user.userDetails[0];

    // Compare provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userDetailsWithPassWord.password
    );
    if (isPasswordCorrect) {
      // Check if two-factor authentication is enabled
      if (userDetails.istwoFactorEnabled) {
        // Check if the user has an unused OTP
        const isUserHaveUnUsedLoginOtp =
          await AuthRepository.isUserHavesUnUsedLoginRequestOtp(
            userDetailsWithPassWord.userId
          );

        if (isUserHaveUnUsedLoginOtp) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "User has an unused OTP. Try again after 15 minutes."
          );
        }

        // Generate and send a new OTP if needed
        const otp = generateOTP();
        await AuthRepository.createLoginOtpRequest(
          otp,
          userDetailsWithPassWord.userId
        );
        sendEmail(otp, user.email, "Login");

        return {
          message: "OTP has been sent to the official email",
          isOtpShouldBeVerifiedForLogin: true,
        };
      } else {
        // Two-factor authentication is not enabled
        // Generate a JWT token for the user

        const token = jwt.sign(
          { id: userDetailsWithPassWord.user.id },
          config.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );

        return {
          token: token,
          message: "Logged In successfully",
          user: userDetails,
          isOtpShouldBeVerifiedForLogin: false,
        };
      }
    } else {
      // Password is incorrect
      throw new HttpError(HttpStatus.BAD_REQUEST, "Password is not correct");
    }
  } else {
    throw new HttpError(HttpStatus.BAD_REQUEST, "Password is required");
  }
};

const sendForgotPassWordOtp = async (data: any) => {
  const userDetails = await AuthRepository.getUserDetailsWithPassWordByEmail(
    data.email
  );

  if (!userDetails) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Email not found or password is already deleted"
    );
  }
  const otp = generateOTP();
  await AuthRepository.forgotPassWordOtpInsert(otp, userDetails.userId);
  return sendEmail(otp, data.email, "Forgot Password");
};

const verifyForgotPassWordOtp = async (otp: string, email: string) => {
  const userDetails = await AuthRepository.getUserDetailsWithPassWordByEmail(
    email
  );

  if (!userDetails) {
    throw new HttpError(HttpStatus.BAD_REQUEST, "Email not found");
  }
  const isOtpVerified = await AuthRepository.verifyForgotPassWordOtp(
    otp,
    userDetails.userId
  );
  if (!isOtpVerified) {
    throw new HttpError(HttpStatus.BAD_REQUEST, "Otp is not valid");
  }
  await AuthRepository.markForgotPassWordOtpAsUsed(otp, userDetails.userId);
  await AuthRepository.deleteUserExistingPasswordDetails(userDetails.userId);
};

const resetPassWord = async (email: string, password: string) => {
  const userDetails = await AuthRepository.isUserExistWithEmailDetails(email);

  if (!userDetails) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Email not found or user is deleted"
    );
  }
  if (userDetails.user.password.length > 0) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Previous Otp verification is failed so please complete that step to proceed"
    );
  }
  const hashedPassWord = await hashPassWord(password);

  await AuthRepository.resetPassWord(hashedPassWord, userDetails.user.id);
};

export const verifyLoginOtp = async (email: string, otp: string) => {
  const userData: any = await AuthRepository.getUserDetailsWithPassWordByEmail(
    email
  );

  if (!userData) {
    throw new HttpError(HttpStatus.BAD_REQUEST, "Email not found");
  }

  const userDetails = userData.user.userDetails[0];
  const isOtpVerified = await AuthRepository.verifyLoginOtpRequest(
    otp,
    userDetails.userId
  );

  if (!isOtpVerified) {
    throw new HttpError(HttpStatus.BAD_REQUEST, "Otp is not valid");
  }

  await AuthRepository.markLoginOtpAsUsed(otp, userDetails.userId);
  const token = jwt.sign({ id: userDetails.id }, config.SECRET_KEY, {
    expiresIn: "24h",
  });
  return {
    message: "Logged In successfully",
    token: token,
    user: userDetails,
    isOtpShouldBeVerifiedForLogin: false,
  };
};
const AuthService = {
  loginUser,
  sendForgotPassWordOtp,
  verifyForgotPassWordOtp,
  resetPassWord,
  verifyLoginOtp,
};

export default AuthService;
