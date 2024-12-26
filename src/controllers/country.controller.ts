import asyncHandler from "../middleware/asyncHandler";
import CountryService from "../service/country.service";
import ApiResponse from "../utils/apiResponse";
import { HttpStatus } from "../utils/httpError";
import { NextFunction, Request, Response } from "express";

const createCountry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await CountryService.createNewCountry(req.body);
      ApiResponse.send(res, HttpStatus.OK.code, "Country created successfully");
    } catch (err) {
      next(err);
    }
  }
);

const updateCountry = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await CountryService.updateCountryDetails(req.body);
    ApiResponse.send(res, HttpStatus.OK.code, "Country updated successfully");
  }
);
const getAllCountryDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await CountryService.getAllCountryDetails(req.query.search);

    ApiResponse.send(
      res,
      HttpStatus.OK.code,
      "Country details fetched successfully",
      data
    );
  }
);

const CountryController = {
  createCountry,
  updateCountry,
  getAllCountryDetails,
};

export default CountryController;
