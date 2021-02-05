import client from './client';

async function reset(): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return client.flushallAsync();
}

export default reset;
