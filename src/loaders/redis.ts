import * as redis from 'redis';
import config from '../config';
import Logger from './winston';

// Connection to redis client
const redisClient = redis.createClient(
  parseInt(config.redisPort),
  config.redisHost
);

redisClient
  .on('connect', () => {
    Logger.info(
      `DATABASE :: redis connetion @ ${config.redisHost}:${config.redisPort} ✅`
    );
  })
  .on('error', (error) => {
    Logger.error(`${error} ❌`);
    throw error;
  });

export default redisClient;
