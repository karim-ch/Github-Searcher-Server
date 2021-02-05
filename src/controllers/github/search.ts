import { Response, Request } from 'express';
import { searchOrCache } from '@services/search';

async function search(request: Request, response: Response): Promise<Response> {
  try {
    const {
      body: { type, query },
    } = request;

    const result = await searchOrCache({ type, query });

    return response.status(200).send(result);
  } catch (error) {
    console.error(error);
    return response.sendStatus(500);
  }
}

export default {
  method: 'post',
  path: '/api/search',
  handler: search,
};
