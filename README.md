## Installation Notes 

1) yarn install
2) Copy content of .env-example file to .env
3) Set database details in .env

## Run with yarn

4) Run 'yarn start' It will start the project and create database tables from ORM models. 
5) Server will be started on base url http://localhost:9000/

## Run with pm2

4) Run 'pm2 start' It will start the project and create database tables from ORM models. 
5) Server will be started on base url http://localhost:9000/

## Files Structure

Execution is starting from server.js
In app.js, packages and routes are imported.


## Routes

routes files can be found in api/routes directory. Each module has its own route file. 


## Controllers

Routes are connected to Controllers. Controllers are in api/controllers directory. Controllers uses Sequelize models to interact with database and return the response to the routes. 


## Models

ORM models of database entities are placed in database/models directory. 


## Middlewares

In routes a middleware ‘check-auth’ is being used. File of that middleware can be found in api/middleware/check-auth.js


## Request Validations

In api/requests files are used to validate api requests.


## Database Connectivity

For database connectivity, System is using Sequelize package. Sequelize initialization can be found in file database/connection.js. This file has the database configuration. 


## Routes Guide

-> System has a middleware 'check-auth' which authenticate routes with JWT token.
-> Token must be passed in authorization header as 'Bearer Token'
-> Swagger can be accessed on http://localhost:9000/api-docs






