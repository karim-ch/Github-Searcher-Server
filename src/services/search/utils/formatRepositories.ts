import { GithubSearch } from '@tsTypes';

async function formatRepositories(data: GithubSearch): Promise<GithubSearch> {
  // Example: Adding the type to the repo
  return {
    ...data,
    items: data.items.map(item => ({ ...item, type: 'Repository' })),
  };
}

export default formatRepositories;
