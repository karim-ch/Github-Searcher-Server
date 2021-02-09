import githubController from './github';
import cacheController from './cache';

export default [...githubController, ...cacheController];
