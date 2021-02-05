import { Response, Request } from 'express';
import { reset } from '@lib/redis';

async function clearCache(request: Request, response: Response): Promise<Response> {
  try {
    const result = await reset();

    return response.status(200).send(result);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}

export default {
  method: 'get',
  path: '/api/clear-cache',
  handler: clearCache,
};
