import { GithubSearch } from '@tsTypes';
import getUserDetails from '@lib/github/getUserDetails';

async function enrichUser(data: GithubSearch): Promise<GithubSearch> {
  const { items: users } = data;
  const usersWithDetails = await Promise.all(users.map(getUserDetails));
  return {
    ...data,
    items: usersWithDetails,
  };
}

export default enrichUser;
