import Joi from "joi";

export const createCountry = Joi.object({
  countryCode: Joi.string().trim().required().min(1).max(5),
  countryName: Joi.string().trim().required().min(2).max(50),
}).required();

export const updateCountry = Joi.object({
  id: Joi.number().required(),
  countryCode: Joi.string().trim().required().min(1).max(5),
  countryName: Joi.string().trim().required().min(2).max(50),
  isActive: Joi.boolean().required(),
});

export const getAllCountryDetails = Joi.object({
  search: Joi.string().optional().allow(""),
});
