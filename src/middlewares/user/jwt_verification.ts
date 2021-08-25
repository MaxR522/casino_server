import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';

const jwtVerification = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      config.accessTokenSecretKey,
      (error: any, decoded: any) => {
        if (error) {
          throw new Error(error);
        }

        if (decoded) {
          req.userData = decoded;
          req.token = token;

          next();
        }
      }
    );
  } else {
    return res.status(401).json({
      message: 'Token missing',
    });
  }
};

export default jwtVerification;
