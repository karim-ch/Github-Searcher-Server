import client from './client';
import camelcaseKeys from 'camelcase-keys';
import { User } from '@Types/GithubSearch';

async function getUserDetails(user: User): Promise<User> {
  try {
    const { data } = await client.request(`GET /users/${user.login}`);
    return { ...user, ...camelcaseKeys(data, { deep: true }) };
  } catch (error) {
    return user;
  }
}

export default getUserDetails;
