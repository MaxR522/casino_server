import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import Logger from '../../loaders/winston';

const checkValidationResult = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    Logger.error('Wrong or missing params');
    return res.status(422).json({
      success: false,
      message: 'Params error',
      errors: errors.array(),
    });
  }

  return next();
};

export default checkValidationResult;
