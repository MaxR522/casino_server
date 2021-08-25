import * as _ from 'lodash';
import User from '../model/user';
import IUser from '../interfaces/user_interface';

/**
 *
 * @param bet bet that user provide
 * @param result result of the gane
 * @param username username of the user
 */
const winCalculator = async (
  bet: number,
  result: number[],
  username: string
) => {
  // 2 4 6 7
  const win1: number[] = [2, 2, 2];
  const win2: number[] = [4, 4, 4];
  const win3: number[] = [6, 6, 6];
  const win4: number[] = [7, 7, 7];

  let benefit = bet;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    if (user) {
      if (_.isEqual(result, win1)) {
        user.score += bet * 2;

        user.save((error: any) => {
          if (error) {
            throw new Error(error.toString());
          }
        });

        return (benefit = bet * 2);
      } else if (_.isEqual(result, win2)) {
        user.score += bet * 4;

        user.save((error: any) => {
          if (error) {
            throw new Error(error.toString());
          }
        });

        return (benefit = bet * 4);
      } else if (_.isEqual(result, win3)) {
        user.score += bet * 6;

        user.save((error: any) => {
          if (error) {
            throw new Error(error.toString());
          }
        });

        return (benefit = bet * 6);
      } else if (_.isEqual(result, win4)) {
        user.score += bet * 24;

        user.save((error: any) => {
          if (error) {
            throw new Error(error.toString());
          }
        });

        return (benefit = bet * 24);
      } else {
        if (user.score > 0) {
          user.score -= bet;

          user.save((error: any) => {
            if (error) {
              throw new Error(error.toString());
            }
          });
        }

        return (benefit = -bet);
      }
    }

    return benefit;
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

export default winCalculator;
