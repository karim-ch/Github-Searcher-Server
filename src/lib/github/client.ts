import { Octokit } from '@octokit/core';

import { getEnv } from '../../utils/getEnv';

const secretKey = getEnv('CLIENT_SECRET', '');

const octokit = new Octokit({
  auth: secretKey,
});

export default octokit;
