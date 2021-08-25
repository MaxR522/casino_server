import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import Logger from './winston';
import morganMiddleware from './morgan';
import Routes from '../routes';

import config from '../config';

const app = express();

// Middlewares
// Helmet for security
app.use(helmet());

// body-parser
app.use(express.json({ limit: config.maxUploadLimit }));
app.use(express.urlencoded({ extended: true, limit: config.maxUploadLimit }));

// cross-origin
app.use(cors(config.corsOption));

// morgan
app.use(morganMiddleware);

// Routes
app.use('/', Routes);

// Error Handler

app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  Logger.error(err.stack);
  return res
    .status(400)
    .json({ message: 'Something went wrong !', errors: err.stack });
});

// connection to mongoDB
mongoose.connect(config.mongooseURI, config.mongooseOption, (error) => {
  if (error) {
    Logger.error(`${error} ❌`);
    throw error;
  } else {
    Logger.info(`Database :: mongodb connection @: ${config.mongooseURI} ✅`);
  }
});

export default app;
