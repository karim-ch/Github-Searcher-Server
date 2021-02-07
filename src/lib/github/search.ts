import client from './client';
import camelcaseKeys from 'camelcase-keys';
import { GithubSearch, SearchType } from '@tsTypes';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

async function search({ type, query }: SearchQuery): Promise<GithubSearch> {
  try {
    console.info('Fetching from github ...');
    const { data } = await client.request(`GET /search/${type}?q=${query}`);
    return camelcaseKeys(data, { deep: true });
  } catch (error) {
    return {
      items: [],
      totalCount: 0,
      incompleteResults: false,
    };
  }
}

export default search;
