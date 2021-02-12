import { saveSearch, getCachedSearch } from '@lib/redis';
import { SearchType } from '@Types';

describe('Redis Cache', () => {
  it('it should store data and then find it in redis', async () => {
    const mockData = {
      incompleteResults: false,
      items: [],
      totalCount: 0,
    };
    const mockType = SearchType[SearchType[0]];
    const mockQuery = 'test';

    await saveSearch({
      type: mockType,
      query: mockQuery,
      data: mockData,
    });

    const data = await getCachedSearch({
      type: mockType,
      query: mockQuery,
    });
    expect(data).toEqual(mockData);
  });
});
