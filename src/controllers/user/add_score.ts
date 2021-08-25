import { Request, Response } from 'express';
import User from '../../model/user';
import IUser from '../../interfaces/user_interface';

const AddScore = (req: Request, res: Response) => {
  const userData = req.userData;

  if (userData) {
    User.findOne({ username: userData.username }, (error: any, user: IUser) => {
      if (error) {
        throw new Error(error.toString());
      }

      if (!user) {
        throw new Error(`User ${userData.username} not found`);
      }

      if (user) {
        user.score += 250;

        user.save((error) => {
          if (error) {
            throw new Error(error.toString());
          }

          return res.status(200).json({
            message: `${user.username}'s score increased by 250`,
          });
        });
      }
    });
  }
};

export default AddScore;
