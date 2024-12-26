import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().trim().required().min(2).max(50),
  lastName: Joi.string().trim().required().min(2).max(50),
  mobileNumber: Joi.string()
    .required()
    .length(10)
    .pattern(/^[0-9]+$/),
  roleId: Joi.number().required(),
  countryCode: Joi.string().required().min(1).max(5),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .max(128)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

export const getAllUserDetails = Joi.object({
  search: Joi.string().optional().allow(""),
});

export const updateUserSchema = Joi.object({
  id: Joi.number().required(),
  firstName: Joi.string().trim().required().min(2).max(50),
  lastName: Joi.string().trim().required().min(2).max(50),
  countryCode: Joi.string().required().min(1).max(5),
  mobileNumber: Joi.string()
    .required()
    .length(10)
    .pattern(/^[0-9]+$/),
  email: Joi.string().required().email(),
  isActive: Joi.boolean().required(),
  userDetails: Joi.object({
    id: Joi.number().required(),
  }).required(),
}).required();
