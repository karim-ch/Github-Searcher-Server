/* eslint-disable @typescript-eslint/ban-ts-comment */
import client from './client';

interface SearchQuery {
  type: 'users' | 'repos';
  query?: string;
}

function getSearches({ type, query }: SearchQuery): Promise<string> {
  // @ts-ignore
  return client.hgetAsync(type, query);
}

export default getSearches;
