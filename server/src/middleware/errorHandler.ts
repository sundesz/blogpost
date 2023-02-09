import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  console.log(error);
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json(error.errors[0].message as string);
    case 'SequelizeValidationError':
      return res.status(400).json(error.errors[0].message as string);
    default:
      return res.status(400).json(error.message as string);
  }
  next(error);
};
