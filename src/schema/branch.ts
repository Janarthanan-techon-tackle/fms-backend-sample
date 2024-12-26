import Joi from "joi";

export const createBranch = Joi.object({
  branchName: Joi.string().trim().required().min(2).max(50),
  countryId: Joi.number().required(),
});

export const updateBranch = Joi.object({
  id: Joi.number().required(),
  branchName: Joi.string().trim().required().min(2).max(50),
  isActive: Joi.boolean().required(),
});

export const getAllBranchDetails = Joi.object({
  search: Joi.string().optional().allow(""),
  countryId: Joi.number().required().min(0),
});
