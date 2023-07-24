import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

// Middleware function for validating username and password
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    next();
  };
};

// User authentication schema
export const userAuthSchema = Joi.object({
  username: Joi.string().email().required().messages({
    'string.email': 'Invalid username or password.',
    'string.empty': 'Invalid username or password.',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.min': 'Invalid username or password.',
    'string.max': 'Invalid username or password.',
  }),
});

// New user schema
export const newUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid username.',
    'string.empty': 'Invalid username.',
  }),
  name: Joi.string().required(),
  role: Joi.string().valid('admin', 'author', 'user'),
  password: Joi.string().min(6).max(20).required(),
});

// New blog post schema
export const newPostSchema = Joi.object({
  title: Joi.string().min(6).max(40).required(),
  content: Joi.string().required(),
  author: Joi.string().email().required(),
  slug: Joi.string().email().required(),
});

// New comment schema
export const newCommentSchema = Joi.object({
  title: Joi.string().min(4).max(60).required(),
  content: Joi.string().required(),
  role: Joi.string().valid(1, 2, 3, 4, 5),
});
