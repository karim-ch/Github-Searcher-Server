import app from '../../app';
import request from 'supertest';
import { closeClient, getAll } from '@lib/redis';

describe('GET /api/clear-cache', () => {
  it('Clear Cache API Request', async () => {
    const result = await request(app).get('/api/clear-cache');
    const data = await getAll();
    expect(data).toEqual(null);
    expect(result.text).toEqual('"OK"');
    expect(result.status).toEqual(200);
  });
});

afterAll(async () => {
  await closeClient();
});
