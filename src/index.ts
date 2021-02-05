import 'module-alias/register';
import 'dotenv/config';
import { createServer } from 'http';
import app from './app';
import { getEnv } from '@utils/getEnv';

const server = createServer(app);

const port = getEnv('PORT', 7000);

server.listen(port, () => console.info(`Server is up and listening on ${port}`));
