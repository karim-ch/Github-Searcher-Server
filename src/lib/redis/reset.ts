import client from './client';

async function reset(): Promise<string> {
  return new Promise((resolve, reject) =>
    client.flushall((error, result) => {
      if (error) reject(error);
      resolve(result);
    }),
  );
}

export default reset;
