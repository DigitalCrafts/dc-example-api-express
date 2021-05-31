# Server - Express

## Technologies

- Node
- Express
- PostgreSQL
- Sequelize
- Swagger

## Getting Started

#### Technologies

First of all, make sure you have the following technologies installed and working. Note that you may be able to run the application at a version higher than the one listed, but this app was only tested with the version listed.

- Node - 14
- Postgres - 13

#### Install dependencies

Next, install the required packages:

```
npm install
```

#### Set up database

Make sure you have a postgres server running and run the following NPM script. The default connection information is generally sufficient for macOS and Linux, though you may want to change some of the settings for the database connection. In this case, refer to the [Environment Variables](#environment-variables) section below.

```
npm run db:reset
```

## Environment Variables

Environment variables can be configured by creating a new `.env` file in the project and adjusting variables as necessary. There is an example `.env.example` file included with the project that contains all of the possible environment variables.

## Swagger

Swagger is used to document this API. It is available at the `/docs` path while the server is running.
