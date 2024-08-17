import Joi from 'joi'

export const blogValidationSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  publish_date: Joi.date().iso().required(),
  categories: Joi.array().items(Joi.number()).required(),
  author: Joi.string().required(),
  email: Joi.string().email().optional(),
})
