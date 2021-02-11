/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleNameMapper: {
    '^@utils/(.*)$': resolve(__dirname, './src/utils/$1'),
    '^@utils$': resolve(__dirname, './src/utils'),
    '^@controllers/(.*)$': resolve(__dirname, './src/controllers/$1'),
    '^@controllers$': resolve(__dirname, './src/controllers'),
    '^@services/(.*)$': resolve(__dirname, './src/services/$1'),
    '^@services': resolve(__dirname, './src/services'),
    '^@lib/(.*)$': resolve(__dirname, './src/lib/$1'),
    '^@lib': resolve(__dirname, './src/lib'),
    '^@Types/(.*)$': resolve(__dirname, './src/types/$1'),
    '^@Types': resolve(__dirname, './src/types'),
  },
};
