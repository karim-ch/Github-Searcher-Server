import client from './client';
import { SearchType, GithubSearch } from '@tsTypes';

interface Cache {
  type: SearchType;
  query?: string;
  data: GithubSearch;
}

async function saveSearch({ type, query, data }: Cache): Promise<string> {
  return new Promise((resolve, reject) =>
    client.set(`${type}_${query}`, JSON.stringify(data), (error, result) => {
      if (error) reject(error);
      resolve(result);
    }),
  );
}

export default saveSearch;
