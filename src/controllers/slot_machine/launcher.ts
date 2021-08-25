import { Request, Response } from 'express';
import winCalculator from '../../utils/win_calculator';

const LaunchSlotMachine = async (req: Request, res: Response) => {
  const bet = req.body.bet;
  const user = req.userData;
  const choice = [2, 4, 6, 7];

  const getRandomIndex = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  const res1 = choice[getRandomIndex(choice.length)];
  const res2 = choice[getRandomIndex(choice.length)];
  const res3 = choice[getRandomIndex(choice.length)];

  const result = [res1, res2, res3];

  const winCondition = res1 === res2 && res2 == res3 && res3 === res1;

  const benefit = await winCalculator(bet, result, user.username);

  if (winCondition) {
    return res.status(200).json({
      message: 'WIN!!!',
      result,
      benefit,
    });
  } else {
    return res.status(200).json({
      message: 'LOST!!!',
      result,
      loss: benefit,
    });
  }
};

export default LaunchSlotMachine;
