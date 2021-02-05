# GitHub Search TypeScript Server

## Getting Started
Install node modules: `npm install`

## Install docker & run a local redis docker image
 `docker pull redis`

 `docker run -p PORT:PORT --name redis-sample -d redis`

Example:  `docker run -p 6379:6379 --name redis-sample -d redis`

## Include a .env file
Please follow the .env.example file.

In the `REDIS_PORT` please make sure to put the same port you used in the redis
docker image. ie: `6379`

## Run the development server

Run the code with auto restart: `npm run dev`


