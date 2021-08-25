import User from '../../model/user';
import * as argon2 from 'argon2';
import IUser from '../../interfaces/user_interface';
import { Request, Response, NextFunction } from 'express';

const VerifyPassword = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  return User.findOne({ username }, async (error: any, user: IUser) => {
    if (error) {
      throw new Error(error.toString());
    }

    if (!user) {
      throw new Error('No user found');
    }

    if (user) {
      try {
        const isMatch = await argon2.verify(user.password, password);
        if (isMatch) {
          next();
        } else {
          return res.status(401).json({
            message: 'Wrong email or password',
          });
        }
      } catch (error: any) {
        throw new Error(error.toString());
      }
    }
  });
};

export default VerifyPassword;
