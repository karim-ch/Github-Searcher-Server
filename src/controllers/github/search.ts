import { Response, Request } from 'express';
import { search as searchService } from '../../services/github';

async function search(request: Request, response: Response): Promise<Response> {
  try {
    const {
      body: { type, query },
    } = request;

    const result = await searchService({ type, query });

    return response.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
}

export default {
  method: 'post',
  path: '/app/search',
  handler: search,
};
