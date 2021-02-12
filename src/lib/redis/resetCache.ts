import client from './client';

async function resetCache(): Promise<string> {
  return new Promise((resolve, reject) =>
    client.flushall((error, result) => {
      if (error) reject(error);
      resolve(result);
    })
  );
}

export default resetCache;
