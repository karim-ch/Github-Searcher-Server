import app from '../src/app';
import request from 'supertest';
import { GithubSearch, SearchType } from '@Types';
import { search } from '@lib/github';

jest.mock('../src/lib/github/search');
const searchInGithub = search as jest.Mock<Promise<GithubSearch>>;

searchInGithub.mockImplementation(() => {
  return Promise.resolve({
    totalCount: 5,
    incompleteResults: false,
    items: [],
  });
});

describe('Cache or Search in github', () => {
  it('it should fetch data from github if theres no cached data , else from redis', async () => {
    const mockSearch = { type: Object.keys(SearchType)[0], query: 'qqq' };
    await request(app).post('/api/search').send(mockSearch);
    expect(searchInGithub).toHaveBeenCalled();
    jest.resetAllMocks();
    await request(app).post('/api/search').send(mockSearch);
    expect(searchInGithub).not.toHaveBeenCalled();
  });
});
