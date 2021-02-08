import { search } from '@lib/github';
import { getCachedSearch, saveSearches } from '@lib/redis';
import { SearchType, GithubSearch } from '@tsTypes';
import formatUsers from './utils/formatUsers';
import formatRepositories from './utils/formatRepositories';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

async function searchOrCache({ type, query }: SearchQuery): Promise<GithubSearch> {
  const cachedResults = await getCachedSearch({ type, query });
  if (cachedResults) return JSON.parse(cachedResults);
  const data = await search({ type, query });

  let result;
  if (type === 'users') {
    result = await formatUsers(data);
  } else {
    result = await formatRepositories(data);
  }

  await saveSearches({ type, query, data: JSON.stringify(result) });
  return result;
}

export default searchOrCache;
