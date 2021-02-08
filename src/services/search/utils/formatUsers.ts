import { GithubSearch } from '@tsTypes';
import getUserDetails from '@lib/github/getUserDetails';
import { User } from '@tsTypes/GithubSearch';

async function formatUsers(data: GithubSearch): Promise<GithubSearch> {
  // Example of adding count of repositories to the user
  const promises = data.items.map(item => getUserDetails((item as User).login));
  const details = await Promise.all(promises);

  const usersWithReposCount = data.items.map((item, i) => ({
    ...item,
    ...details[i],
  }));

  return {
    ...data,
    items: usersWithReposCount,
  };
}

export default formatUsers;
