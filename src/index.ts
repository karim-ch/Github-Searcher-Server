import 'dotenv/config';
import { createServer } from 'http';
import app from './app';
import { getEnv } from './utils/getEnv';

const server = createServer(app);

const port = getEnv('PORT', 3000);

server.listen(port, () => {
  return console.log(`Server is up and listening on ${port}`);
});
