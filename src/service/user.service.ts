import UserRepository from "../repository/user.repository";
import hashPassWord from "../utils/hashedPassWord";
import { HttpError, HttpStatus } from "../utils/httpError";

const createUser = async (user: any) => {
  // Hash the password
  if (user.password != null) {
    const hashedPassword = await hashPassWord(user.password);
    const userWithHashedPassword = { ...user, password: hashedPassword };

    // Check if a user with the same email already exists
    const existingUser = await UserRepository.findUserByEmail(user.email);
    if (existingUser) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "User already exist with same email"
      );
    }
    const isUserExistWithSameMobileNumber =
      await UserRepository.findUserWithMobileNumber(user.mobileNumber);
    if (isUserExistWithSameMobileNumber) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "User already exist with same mobile number"
      );
    }
    return UserRepository.createUser(userWithHashedPassword);
  }
};

const getAllUserDetails = async (search: any) => {
  const userDetails = await UserRepository.findAllUserDetails(search);
  return userDetails;
};

const updateUserDetails = async (user: any) => {
  const isDifferentUserExistWithSameEmail =
    await UserRepository.isMobileNumberBelongsToDifferentUser(
      user.id,
      user.email
    );

  if (isDifferentUserExistWithSameEmail) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Email have been taken by another user"
    );
  }

  const isDifferentUserExistWithSameMobileNumber =
    await UserRepository.isMobileNumberBelongsToDifferentUser(
      user.id,
      user.mobileNumber
    );

  if (isDifferentUserExistWithSameMobileNumber) {
    throw new HttpError(
      HttpStatus.BAD_REQUEST,
      "Mobile number have been taken by another user"
    );
  }

  return UserRepository.updateUserData(user);
};

const UserService = { createUser, getAllUserDetails, updateUserDetails };

export default UserService;
