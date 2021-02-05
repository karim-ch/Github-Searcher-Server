import { search } from '../../lib/github';
import { getSearches, saveSearches } from '../../lib/redis';

interface SearchQuery {
  type: 'users' | 'repos';
  query?: string;
}

async function searchOrCache({ type, query }: SearchQuery) {
  const cachedResults = await getSearches({ type, query });
  if (cachedResults) return JSON.parse(cachedResults);
  const data = await search({ type, query });

  await saveSearches({ type, query, data: JSON.stringify(data) });
  return data;
}

export default searchOrCache;
