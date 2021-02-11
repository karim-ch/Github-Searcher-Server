import redis from 'redis';
import { getEnv } from '@utils/getEnv';

const port = getEnv('REDIS_PORT', 6379);
const host = getEnv('REDIS_HOST', '127.0.0.1');

const client = redis.createClient({
  port,
  host,
});

export default client;
