import User from '../../model/user';
import { Request, Response, NextFunction } from 'express';
import IUser from '../../interfaces/user_interface';

const checkDuplicateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;

  User.findOne({ email }, (error: any, user: IUser) => {
    if (error) {
      throw new Error(error.toString());
    }

    if (user) {
      return res.status(409).json({
        message: `user with email: ${email} already exist`,
      });
    }

    if (!user) {
      next();
    }
  });
};

export default checkDuplicateEmail;
