import express from "express";

import validate, { ValidationSource } from "../middleware/validate";
import BranchController from "../controllers/branch.controller";
import {
  createBranch,
  getAllBranchDetails,
  updateBranch,
} from "../schema/branch";

const router = express.Router();

router.post(
  "",
  validate(createBranch, ValidationSource.BODY),
  BranchController.createBranch
);

router.get(
  "",
  validate(getAllBranchDetails, ValidationSource.QUERY),
  BranchController.getAllBranchDetails
);

router.patch(
  "",
  validate(updateBranch, ValidationSource.BODY),
  BranchController.updateBranchDetails
);

export default router;
