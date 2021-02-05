import client from './client';
import camelcaseKeys from 'camelcase-keys';
import { SearchResult } from '../../types';

interface SearchQuery {
  type: 'users' | 'repos';
  query?: string;
}

async function search({
  type = 'users',
  query = '',
}: SearchQuery): Promise<SearchResult> {
  const { data } = await client.request(`GET /search/${type}?q=${query}`);
  return camelcaseKeys(data, { deep: true });
}

export default search;
