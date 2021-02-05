import client from './client';
import camelcaseKeys from 'camelcase-keys';
import { SearchUsers, SearchRepositories } from '../../types';

interface SearchQuery {
  type: 'users' | 'repos';
  query?: string;
}

async function search({
  type = 'users',
  query = '',
}: SearchQuery): Promise<SearchUsers | SearchRepositories> {
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
