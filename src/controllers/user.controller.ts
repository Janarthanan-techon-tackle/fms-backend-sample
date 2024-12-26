import UserService from "../service/user.service";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../utils/httpError";
import ApiResponse from "../utils/apiResponse";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserService.createUser(req.body);
    ApiResponse.send(res, HttpStatus.OK.code, "User created successfully");
    return;
  } catch (err) {
    next(err);
  }
};

const getAllUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails = await UserService.getAllUserDetails(req.query.search);
    ApiResponse.send(
      res,
      HttpStatus.OK.code,
      "User data fetched successfully",
      userDetails
    );
    return;
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = await UserService.updateUserDetails(req.body);
  ApiResponse.send(
    res,
    HttpStatus.OK.code,
    "User data updated successfully",
    data
  );
  return;
};

const UserController = { createUser, getAllUserDetails, updateUser };

export default UserController;
