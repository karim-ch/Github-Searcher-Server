import client from './client';

async function closeClient(): Promise<string> {
  return new Promise((resolve, reject) =>
    client.quit((error, result) => {
      if (error) reject(error);
      resolve(result);
    })
  );
}

export default closeClient;
