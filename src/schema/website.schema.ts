import Joi from 'joi';

export const createWebsite = Joi.object({
    name: Joi.string().trim().required().min(2).max(50),
    url: Joi.string().uri().required(),
    description: Joi.string().optional().allow(''),
    isActive: Joi.boolean().default(true)
}).required();

export const updateWebsite = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().trim().optional().min(2).max(50),
    url: Joi.string().uri().optional(),
    description: Joi.string().optional().allow(''),
    isActive: Joi.boolean().optional()
});
