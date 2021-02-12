import app from '../src/app';
import request from 'supertest';
import { GithubSearch, SearchType } from '@Types';
import { search } from '@lib/github';

jest.mock('../src/lib/github/search');
const searchInGithub = search as jest.Mock<Promise<GithubSearch>>;

describe('Cache or Search in github', () => {
  it('it should fetch data from github or redis if theres no cached data', async () => {
    const mockResult = {
      totalCount: 5,
      incompleteResults: false,
      items: [],
    };
    searchInGithub.mockImplementation(() => {
      return Promise.resolve(mockResult);
    });

    const mockSearch = { type: Object.keys(SearchType)[0], query: 'qqq' };
    await request(app).post('/api/search').send(mockSearch);
    expect(searchInGithub).toHaveBeenCalled();
    jest.resetAllMocks();
    await request(app).post('/api/search').send(mockSearch);
    expect(searchInGithub).not.toHaveBeenCalled();
  });
});
