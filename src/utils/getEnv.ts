import 'dotenv/config';

function getEnv(varName: string, defaultValue: string | number): any {
  return process.env[varName] || defaultValue;
}

export { getEnv };
