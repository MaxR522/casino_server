require('dotenv').config();

const port = process.env.PORT || 2222;
const maxUploadLimit = process.env.MAX_UPLOAD || '25mb';
const mongooseURI = process.env.MONGODB_URI || '';
const mongooseOption = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT || '';
const origin = process.env.ORIGIN || '*';

const accessTokenSecretKey =
  process.env.ACCESS_TOKEN_SECRET_KEY || 'bla bla car';
const accessTokenExpiryTime = process.env.ACCESS_TOKEN_EXPIRY_TIME;

const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
const refreshTokenExpiryTime = process.env.REFRESH_TOKEN_EXPIRY_TIME;

export const corsOption = {
  origin,
  // allowedHeaders: '',
  // exposedHeaders: '',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

export default {
  port,
  maxUploadLimit,
  mongooseURI,
  mongooseOption,
  redisHost,
  redisPort,
  corsOption,
  accessTokenSecretKey,
  accessTokenExpiryTime,
  refreshTokenSecretKey,
  refreshTokenExpiryTime,
};
