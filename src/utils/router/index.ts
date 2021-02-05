import { forEach } from 'lodash';
import { Express } from 'express';

export function applyRoutes(routes: [], app: Express): Express {
  return forEach(routes, ({ method, path, handler }) => {
    app[method](path, handler);
  });
}
