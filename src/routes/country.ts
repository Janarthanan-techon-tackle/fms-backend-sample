import express from "express";
import validate, { ValidationSource } from "../middleware/validate";
import {
  createCountry,
  getAllCountryDetails,
  updateCountry,
} from "../schema/country";
import CountryController from "../controllers/country.controller";

const router = express.Router();

router.post(
  "",
  validate(createCountry, ValidationSource.BODY),
  CountryController.createCountry
);

router.patch(
  "",
  validate(updateCountry, ValidationSource.BODY),
  CountryController.updateCountry
);

router.get(
  "",
  validate(getAllCountryDetails, ValidationSource.QUERY),
  CountryController.getAllCountryDetails
);

export default router;
