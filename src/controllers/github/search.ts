import { Response, Request } from 'express';
import { search as searchService } from '@services/search';

async function search(request: Request, response: Response): Promise<Response> {
  try {
    const {
      body: { type, query },
    } = request;

    const result = await searchService({ type, query });

    return response.status(200).json(result);
  } catch (error) {
    const { message } = error;
    console.error(message);
    return response.status(500).json(message);
  }
}

export default {
  method: 'post',
  path: '/api/search',
  handler: search,
};
