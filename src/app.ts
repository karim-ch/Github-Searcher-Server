import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { applyRoutes } from '@utils/router';
import controllers from '@controllers';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

applyRoutes(controllers, app);

export default app;
