import 'dotenv/config';

function getEnv(
  varName: string,
  defaultValue: string | number
): string | number {
  return process.env[varName] || defaultValue;
}

function getEnvVariables(...varNames: [string]): { [key: string]: string } {
  return varNames.reduce(
    (acc, varName) => ({ ...acc, [varName]: process.env[varName] }),
    {}
  );
}

export { getEnvVariables, getEnv };
