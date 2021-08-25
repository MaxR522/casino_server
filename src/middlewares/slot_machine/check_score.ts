/**
 * TO-DO:
 *  check if the score provided by bet is superior of the user's score
 */
import User from '../../model/user';
import IUser from '../../interfaces/user_interface';
import { Request, Response, NextFunction } from 'express';

const checkScore = (req: Request, res: Response, next: NextFunction) => {
  const userData = req.userData;
  const bet = req.body.bet;

  User.findOne({ username: userData.username }, (error: any, user: IUser) => {
    if (error) {
      throw new Error(error.toString());
    }

    if (!user) {
      throw new Error(`user not found`);
    }

    if (user) {
      const condition = user.score >= bet;

      if (!condition) {
        return res.status(403).json({
          message: `You don't have enough score, your score: ${user.score}`,
        });
      } else {
        next();
      }
    }
  });
};

export default checkScore;
