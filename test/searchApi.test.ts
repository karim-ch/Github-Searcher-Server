import app from '../src/app';
import request from 'supertest';
import { closeClient, resetCache } from '@lib/redis';
import { SearchType } from '@Types';

describe('GET /api/search', () => {
  beforeAll(async () => {
    await resetCache();
  });

  afterAll(async () => {
    await closeClient();
  });

  it('it should respond correctly', async () => {
    const result = await request(app)
      .post('/api/search')
      .send({ type: Object.keys(SearchType)[0], query: 'fakeUser' });

    expect(JSON.parse(result.text)).toBeDefined();
    expect(result.status).toEqual(200);
  });

  it('it should respond without a specified search query', async () => {
    const result = await request(app)
      .post('/api/search')
      .send({ type: Object.keys(SearchType)[0] });

    expect(JSON.parse(result.text)).toBeDefined();
    expect(result.status).toEqual(200);
  });

  it('it should throw an error upon invalid search type', async () => {
    const result = await request(app)
      .post('/api/search')
      .send({ query: 'test', type: 'fakeType' });
    expect(result.status).toEqual(500);
  });
});
