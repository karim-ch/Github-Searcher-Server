import redis from 'redis';
import { getEnv } from '@utils/getEnv';

const redisPort = getEnv('REDIS_PORT', 6379);

const client = redis.createClient({
  port: redisPort,
  host: '127.0.0.1',
});

export default client;
