import { search } from '../../lib/github';
import { getCachedSearch, saveSearches } from '../../lib/redis';
import { SearchType, GithubSearch } from '../../types';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

async function searchOrCache({
  type,
  query,
}: SearchQuery): Promise<GithubSearch> {
  const cachedResults = await getCachedSearch({ type, query });
  if (cachedResults) return JSON.parse(cachedResults);
  const data = await search({ type, query });

  await saveSearches({ type, query, data: JSON.stringify(data) });
  return data;
}

export default searchOrCache;
