import client from './client';

async function getAll(): Promise<string> {
  return new Promise((resolve, reject) =>
    client.get('*', (error, result) => {
      if (error) reject(error);
      resolve(result);
    })
  );
}

export default getAll;
