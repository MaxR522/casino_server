import User from '../../model/user';
import { Response, Request } from 'express';
import hashPassword from '../../utils/hash_password';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const SignUp = async (req: Request, res: Response) => {
  const { username, email, age, password } = req.body;

  const hashedPassword = await hashPassword(password).then((result) => result);

  const newUser = new User({
    username,
    email,
    age,
    password: hashedPassword,
  });

  newUser.save(async (error: any) => {
    if (error) {
      throw new Error(error);
    }

    const userData = {
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      score: newUser.score,
    };

    const payload = {
      sub: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    const accessToken = await jwt.sign(payload, config.accessTokenSecretKey, {
      expiresIn: config.accessTokenExpiryTime,
    });

    return res.status(201).json({
      message: 'User successfully created',
      data: userData,
      token: accessToken,
    });
  });
};

export default SignUp;
