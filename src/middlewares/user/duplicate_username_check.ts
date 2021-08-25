import User from '../../model/user';
import { Request, Response, NextFunction } from 'express';
import IUser from '../../interfaces/user_interface';

const checkDuplicateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;

  User.findOne({ username }, (error: any, user: IUser) => {
    if (error) {
      throw new Error(error.toString());
    }

    if (user) {
      return res.status(409).json({
        message: `user with username ${username} already exist`,
      });
    }

    if (!user) {
      next();
    }
  });
};

export default checkDuplicateUsername;
