import client from './client';
import camelcaseKeys from 'camelcase-keys';
import { GithubSearch, SearchType } from '@Types';
import enrichUser from './enrichUser';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

async function search({ type, query = '' }: SearchQuery): Promise<GithubSearch> {
  try {
    console.log('fetching from github');
    const { data } = await client.request(`GET /search/${type}?q=${query}`);
    const enrichedData = type === 'users' ? await enrichUser(data) : data;
    return camelcaseKeys(enrichedData, { deep: true });
  } catch (error) {
    return {
      items: [],
      totalCount: 0,
      incompleteResults: false,
    };
  }
}

export default search;
