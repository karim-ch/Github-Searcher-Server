import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { applyRoutes } from '@utils/router';
import controllers from '@controllers';
import swaggerUi from 'swagger-ui-express';
import * as docs from './swagger.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(docs));

applyRoutes(controllers, app);

export default app;
