import { getCachedSearch, saveSearch } from '@lib/redis';
import { search as githubSearch } from '@lib/github';
import Joi from 'joi';
import { SearchType, GithubSearch } from '@Types';

interface SearchQuery {
  type: SearchType;
  query?: string;
}

const schema = Joi.object({
  type: Joi.string()
    .valid(...Object.keys(SearchType))
    .required(),
  query: Joi.string().allow('').optional(),
});

async function search({ type, query }: SearchQuery): Promise<GithubSearch> {
  const { error } = schema.validate({ type, query });
  if (error) throw error;
  const cachedResults = await getCachedSearch({ type, query });
  if (cachedResults) return cachedResults;
  const data = await githubSearch({ type, query });
  if (data) await saveSearch({ type, query, data });
  return data;
}

export default search;
