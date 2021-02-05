/* eslint-disable @typescript-eslint/ban-ts-comment */
import client from './client';
import { SearchType } from '../../types';

interface Cache {
  type: SearchType;
  query?: string;
  data: string;
}

async function saveSearches({ type, query, data }: Cache): Promise<string> {
  // @ts-ignore
  return await client.hmsetAsync(type, {
    [query]: data,
  });
}

export default saveSearches;
