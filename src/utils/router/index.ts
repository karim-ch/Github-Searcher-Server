import { forEach } from 'lodash';
import { Express, RequestHandler } from 'express';

interface Route {
  handler: RequestHandler;
  path: string;
  method: string;
}

export function applyRoutes(routes: Route[], app: Express): Express {
  return forEach(routes, ({ method, path, handler }) => {
    app[method](path, handler);
  });
}
