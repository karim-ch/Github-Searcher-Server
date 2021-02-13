# GitHub Search TypeScript Server
Github Backend API server which collect & return data from Github & caches it in REDIS.

[Frontend client](https://github.com/karim-ch/GithubSearcherFront)

# 1. Getting Started
Install node modules: `npm install`

## 1.1. Install docker & run a local redis docker image
 `docker pull redis`

 `docker run -p PORT:PORT --name redis-sample -d redis`

Example:  `docker run -p 6379:6379 --name redis-sample -d redis`

> **Note**: After you run this command please save the container ID to use it whenever you want to run the same container again.

To run the same container again:  `docker start your_id`

## 1.2. Include a .env file
Please follow the .env.example file.

Your .env should contain the following elements: 

> CLIENT_SECRET="your_github_client_secret"

`CLIENT_SECRET` is your github client token, useful for making API calls on behalf of your github account.
You can generate one [here](https://github.com/settings/tokens) under `personal access tokens`.

> PORT=7000

`PORT` the express port. Make sure to put the same port you will use later in the frontend. ie: `7000`

> REDIS_PORT=6379

`REDIS_PORT` is the port of the running docker image. Please make sure to put the same port you used in the redis
docker image. ie: `6379`

> REDIS_HOST="127.0.0.1"

`REDIS_HOST` is the host url of your local machine. ie: `127.0.0.1`

## 1.3. Scripts
### Run the development server
Run the code with auto restart: `npm run dev`
### Run tests
Run the code with auto restart: `npm run test`
### Build the application
Compile the code into javascript files: `npm run build`
### Start the application
Executes your generated build files: `npm run start`
### Linting the code
Lint the application: `npm run lint:fix`

## 1.4. Swagger documentation
After running the development server by `npm run dev`, go to the following url `http://locahost:7000/swagger` 
(with 7000 is the port you set in the step 1.2)
to browse the api endpoints documentation and examples.


# 2. Requirements
Writing a Github Backend API server which eventually collect the data from Github & caches it in REDIS.

### 2.1 Search Endpoint:  `/api/search`
* Receives a POST request with search type(**users** or **repositories**) & search text(mandatory).
* The results will be fetched from the GitHub API & cache it for at least 2 hours.

### 2.2 Search Endpoint:  `/api/clear-cache`
* Clears the Backend Caching

# 3. Implementation

## 3.1 Dependencies
This project was build with the following dependencies:

- [express](https://www.npmjs.com/package/express)
  Minimalist web framework for nodejs.
- [body-parser](https://www.npmjs.com/package/body-parser)
  Middleware that parses incoming request bodies into req.body.
- [cors](https://www.npmjs.com/package/cors)
  Middleware used to enable Cross-origin resource sharing from the server domain to outside domains.  
- [@octokit/core](https://www.npmjs.com/package/@octokit/core)
  A well tested and used extendable client for GitHub's REST & GraphQL APIs.
- [redis](https://www.npmjs.com/package/redis)
  Client to interact with the redis in memory data server.
- [joi](https://www.npmjs.com/package/joi)
  A schema description language and data validator for javascript.
- [lodash](https://www.npmjs.com/package/lodash)
  A javaScript utility library delivering modularity, performance & extras.
- [eslint](https://www.npmjs.com/package/eslint)
  A tool for identifying, reporting and fixing patterns found in javascript.
- [camelcase-keys](https://www.npmjs.com/package/camelcase-keys)
  Useful for converting object keys to camel case.
- [jest](https://www.npmjs.com/package/jest)
  Javascript testing framework.
- [supertest](https://www.npmjs.com/package/supertest)
  Provides high-level abstraction for testing HTTP endpoints
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
  Allows serving auto-generated swagger-ui docs based on a swagger.json file.

## 3.2 Project architecture
```
| src/
    |- controllers/
        |- cache/
        |- github/
    |- lib/
        |- redis/
        |- github/
    |- services/
        |- search/
    |- types/
    |- utils/
    |- app.ts
    |- index.ts
| test
```
* **index.ts** : is the main file of the application, it runs the http server of our express app.

* **app.ts** : is the express application, it uses the **applyRoutes** helper defined in utils/ to use an array of routes defined in controllers/

* **controllers/**: is a folder containing the app routes grouped in sub-folders based on the route's context, 
  each route contains the call to a service and exports the handler, path (i.e. /api/search...) and type (i.e. GET, POST...) to the **applyRoutes** helper.
  
  By combining the traditional routes/ and /controllers/ folders into this pattern, it will be easier to make a global view on the controller handler, method and path without looking somewhere else.

* **services/**: This folder contains the app's business layer divided into multiple sub-folders based on the context. It basically combines native functions found in the (**lib/**) folder to output the desired controller requirements.

* **lib/**: Contains native calls to database, in memory cache or external apis.

* **utils/**: Contains of subset of helper functions & constants, ... to be used everywhere in the server.

* **types/**: This is where the typescript interfaces, types are defined.

## 3.3 Explanation

### - POST /api/search/: 
This endpoint requires a body containing a **type** and **query** to retrieve a list of github users or repositories.

Initially, if the frontend calls this endpoint, the services will check if there's any data in the redis cache by the provided **type** and **query** combination: 
- If there's a cached data, it will be returned directly.
- If no cached data is found, the service will call the github client to affect a GET /{**type**}&q={**query**} with the type being an enum between **users | repositories**, and the query is a string.
- If the search data returned from github, cache it in redis for 2 hours and return the data to the frontend

The cache architecture is based on simple key value pairs.

If the user searched for a query = "fakeUser" and type = "users", it will be stored this way
```
> SET KEY: "users_fakeUser"
  VALUE: "{stringified object of the users...}"
> SET EXP: 60*60*2 => will expire in 2 hours
```

If the user searched for a query = "react" and type = "repositories", it will be: 
```
> SET KEY: "repositories_fakeUser"
  VALUE: "{stringified object of the repositories...}"
> SET EXP: 60*60*2 => will expire in 2 hours
```

The overall redis database will contain something like this: 
```
users_karim: "{ incompleteResults: true, itemsCount: 95, items: [ item1, item2 ...] }"
repositories_react: "{ incompleteResults: true, itemsCount: 120, items: [item1... ] }"
users_alice: "{ incompleteResults: false, itemsCount: 10, items: [...] }"
repositories_eslint: "{ incompleteResults: true, itemsCount: 10, items: [...] }"
...
```

When the app request retrieving a cached query, we will make a native get to the redis client querying **{type}_{query}**

Maybe this seems like a hacky way to achieve the caching, I tried using a **HMSET**, this allows storing multiple values into a single key: 
```
   | repositories:
        |query: value 
        |query: value 
   | users:
        |query: value 
        |query: value 
```
The problem with this solution is that we can't expire single query: value pair inside a key without expiring the entire key.
Another solution is using redis databases, but it seems like a deprecated feature.

### - GET /api/clear-cache/:
This simply calls the redis's flushall() method to drop the entire cache.

## 3.4 Tests
A few tests were provided to test the different functionalities of the app: 
- **cacheRedisData.test.ts**: This test basically stores an example of a search response in redis and checks that the example is stored and matches the initial data.

- **searchAndCache.test.ts**: This test will check the search service as described in **3.3**.

- **searchApi.test.ts**: This test will check the high-level API implementation of the GET **/api/search** data and validation.

# 4. Improvements
if I were to spend additional time on the project, I would work on improving the typescript types, and the returned data schema.
