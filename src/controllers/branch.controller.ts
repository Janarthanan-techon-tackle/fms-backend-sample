import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

import ApiResponse from "../utils/apiResponse";
import { HttpStatus } from "../utils/httpError";
import BranchService from "../service/branch.service";

const createBranch = asyncHandler(async (req: Request, res: Response) => {
  await BranchService.createNewBranch(req.body);
  ApiResponse.send(res, HttpStatus.OK.code, "Branch created successfully");
});

const updateBranchDetails = asyncHandler(
  async (req: Request, res: Response) => {
    console.log({
      message: "from the controller",
      "input data": req.body,
    });
    await BranchService.updateBranchDetails(req.body);
    ApiResponse.send(res, HttpStatus.OK.code, "Branch updated successfully");
  }
);

const getAllBranchDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await BranchService.getAllBranchDetails(req.query);
    ApiResponse.send(
      res,
      HttpStatus.OK.code,
      "All branch details fetched successfully",
      data
    );
  }
);

const BranchController = {
  createBranch,
  updateBranchDetails,
  getAllBranchDetails,
};

export default BranchController;
