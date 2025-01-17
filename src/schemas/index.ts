import Joi from "joi";

export const bookSchema = {
  idSchema: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),

  createSchema: Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
  }),

  updateSchema: Joi.object({
    title: Joi.string(),
    author: Joi.string(),
  }),
};
