import express from "express";
import UserController from "../controllers/user.controller";
import validate, { ValidationSource } from "../middleware/validate";
import {
  createUserSchema,
  getAllUserDetails,
  updateUserSchema,
} from "../schema/user";
import verifyTokenAndRole from "../middleware/tokenMiddleware";
import { Roles } from "../utils/enum";
import asyncHandler from "../middleware/asyncHandler";

const router = express.Router();

router.post(
  "/",
  validate(createUserSchema, ValidationSource.BODY),
  // asyncHandler(verifyTokenAndRole([Roles.SuperAdmin])),
  UserController.createUser
);

router.get(
  "/",
  validate(getAllUserDetails, ValidationSource.QUERY),
  UserController.getAllUserDetails
);

router.patch(
  "/",
  validate(updateUserSchema, ValidationSource.BODY),
  UserController.updateUser
);
export default router;
