import client from './client';
import camelcaseKeys from 'camelcase-keys';
import { AdvancedUser } from '@tsTypes/GithubSearch';

async function getUserDetails(login: string): Promise<AdvancedUser> {
  try {
    const { data } = await client.request(`GET /users/${login}`);
    return camelcaseKeys(data, { deep: true });
  } catch (error) {
    return {};
  }
}

export default getUserDetails;
