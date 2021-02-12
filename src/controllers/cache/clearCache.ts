import { Response, Request } from 'express';
import { resetCache } from '@lib/redis';

async function clearCache(
  request: Request,
  response: Response
): Promise<Response> {
  try {
    const result = await resetCache();

    return response.status(200).json(result);
  } catch (error) {
    return response.sendStatus(500);
  }
}

export default {
  method: 'get',
  path: '/api/clear-cache',
  handler: clearCache,
};
