import client from './client';
import { GithubSearch, SearchType } from '@Types';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

function getCachedSearch({ type, query }: SearchQuery): Promise<GithubSearch> {
  return new Promise((resolve, reject) =>
    client.get(`${type}_${query}`, (error, result) => {
      if (error) reject(error);
      resolve(JSON.parse(result));
    }),
  );
}

export default getCachedSearch;
