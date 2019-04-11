A `routing-controllers` based boilerplate I often use with my nodejs microservices, I use typeorm as an ORM. 


## Directory Structure 
`migrations`
contains all auto-generated, manually written migration files for typeorm. 
`src`
 - `abstractions` ( Contains abstract classes and interfaces to define public contracts for concrete classes)
 - `adapters` ( contains any custom written adapters for which a generic api exists in the controllers )
 - `config` ( contains all configuration files )
 - `constants` ( contains all constant definitions for usage across the applications)
 - `enums` ( contains all enums for usage across the applications)
 - `factories` ( You can create place custom factory classes here, for example a factory class that gets you an object of an Adapter class for a specfic merchant to book movies ) 
 - `middlewares` ( All express middlewares are defined here, read more on routing-controller middlewares)
 - `orm` (All typeorm related things like entities are defined here)
 - `services` ( Any thing that gets or writes data is defined here)
 - `types` (All custom types are defined here)
 - `utils` ( any custom utiltiy you may need for example validations are defined here)
 - `views` ( any api that renders an html response will have the html-template defined here, read more on using views on routing-controllers)
 - `workers` ( any thing that needs to be done in the background can be defined here in a worker, the worked can be executed on a different thread)
 - `app.ts` ( contains the bootstrapping code for the application, example creating dbconnections, starting express server etc)
 - `.env` ( not committed, all environment variables will be defined here)
 - `.env.sample` ( you example of environment variables will have to be defined here)
 - `docker-compose.dev.yml` ( Contains your docker configuration for dev)
 - `Dockerfile.dev` ( Your docker container)
 - `jest.config.js` ( Configuration for unit testing using jest)
 - `ormconfig.js`( Configuration to work with your orm from terminal and from the application)
 - `tsconfig.json` ( Your typescript configuration)
 - `tsling.json` ( Your linter configurations)


## Components
 - `postgres` (can be replaced with any database, just add the npm package to use that database as required by typeorm and make modifcations to the docker-compose file)
 - `worker(s)` to do background tasks independent of the main thread
 - `adapters`  to write code of things 

## Using `docker-compose` in development mode
```bash
docker-compose -f docker-compose.dev.yml up
```

## First time dev setup
 - We need to create postgres and redis. We can use the docker-compose.yml file for the same. (If setup-dev file is not available, use the `docker-compose.dev.yml` file)
```bash
docker-compose -f docker-compose.setup-dev.yml up
```
  - Run migrations
```bash
docker-compose -f docker-compose.dev.yml up

# Another terminal
docker exec -it `docker ps -f name=server | tail -1 | awk '{ print $1 }'` bash
npm run migration:up
```

## Reset database
```bash
docker-compose -f docker-compose.dev.yml down
rm -rf postgres
docker-compose -f docker-compose.dev.yml up

# Another terminal
docker exec -it `docker ps -f name=server | tail -1 | awk '{ print $1 }'` bash
npm run migration:generate
npm run migration:up
```

## Generate migration
 - Optionally remove the files from `migrations/` folder which are not already pushed to production
 - Generate the migration
```bash
docker-compose -f docker-compose.dev.yml up

# Another terminal
docker exec -it `docker ps -f name=server | tail -1 | awk '{ print $1 }'` bash
npm run migration:generate
```

## Run `psql`
```bash
docker exec -it `docker ps -f name=postgres | tail -1 | awk '{ print $1 }'` bash
psql -U db_username db_name
```
