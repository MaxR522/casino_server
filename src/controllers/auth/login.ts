import User from '../../model/user';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';
import IUser from '../../interfaces/user_interface';

const Login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  User.findOne({ username }, async (error: any, user: IUser) => {
    if (error) {
      throw new Error(error.toString());
    }

    if (!user) {
      return res.status(404).json({
        message: `user: ${username} not found`,
      });
    }

    if (user) {
      const userData = {
        username: user.username,
        email: user.email,
        age: user.age,
        score: user.score,
      };

      const payload = {
        sub: user._id,
        username: user.username,
        email: user.email,
      };

      const accessToken = await jwt.sign(payload, config.accessTokenSecretKey, {
        expiresIn: config.accessTokenExpiryTime,
      });

      return res.status(200).json({
        message: 'user logged in successfully',
        data: userData,
        token: accessToken,
      });
    }
  });
};

export default Login;
