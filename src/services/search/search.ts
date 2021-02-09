import { search as githubSearch } from '@lib/github';
import { getCachedSearch, saveSearch } from '@lib/redis';
import { SearchType, GithubSearch } from '@tsTypes';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

async function search({ type, query }: SearchQuery): Promise<GithubSearch> {
  const cachedResults = await getCachedSearch({ type, query });
  if (cachedResults) return cachedResults;
  const data = await githubSearch({ type, query });

  await saveSearch({ type, query, data });
  return data;
}

export default search;
