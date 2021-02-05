/* eslint-disable @typescript-eslint/ban-ts-comment */
import client from './client';
import { SearchType } from '../../types';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

function getCachedSearch({ type, query }: SearchQuery): Promise<string> {
  // @ts-ignore
  return client.hgetAsync(type, query);
}

export default getCachedSearch;
