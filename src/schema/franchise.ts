import Joi from 'joi';

export const franchiseSchema = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean(),
    branchId: Joi.number().integer().required()
});