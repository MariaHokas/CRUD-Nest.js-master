<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

CRUD Nest.js app with Docker and Swagger. Started with [Nest](https://github.com/nestjs/nest) framework starter repository.

## Prerequisites
It's required to install:
 1. [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/) for setting up local db.
 2. [NVM](https://github.com/nvm-sh/nvm) for managing `Node.js` versions.

## Setting local environment

Create.env file to your root directory. More information how to take image used in project to use. https://hub.docker.com/r/kcollins/mssql

Example .env file
```bash
#DB
version: '3.1'
services:
  db:
    image: kcollins/mssql:latest
    ports:
      - 1433:1433
    volumes:
      - db_data:/var/opt/mssql
      - ./db-backups:/backups
      - ./db-init:/docker-entrypoint-initdb.d
    secrets:
      - sa-password
      - mssql-password
    environment:
      # ACCEPT_EULA confirms your acceptance of the End-User Licensing Agreement.
      ACCEPT_EULA: Y
      SA_PASSWORD_FILE: /run/secrets/sa-password
      MSSQL_DATABASE: test
      MSSQL_USER: testuser
      MSSQL_PASSWORD_FILE: /run/secrets/mssql-password
      MSSQL_PID: Developer  # Change to the edition you need, e.g. "Express", "Standard", etc.

secrets:
  sa-password:
    file: ./secrets/SA_PASSWORD
  mssql-password:
    file: ./secrets/MSSQL_PASSWORD

volumes:
  db_data:
```

## Setting up Local database

All database variables will be taken from .env file.
```bash
Start you docker-compose first with command
$ docker-compose up -d
```
To check if docker container is runing:

```bash
$ docker ps
```

## Installation of node modules

Select the package manager you want to use in the project. 

```bash
$ npm install
```
Or
```bash
$ yarn install
```

## Running the app scripts


```bash
# development
$ npm run start
```
or

```bash
# development
$ yarn start
```
# watch mode
```bash
# development
$ npm run start:dev
```
or
```bash
# development
$ yarn star:dev

```
##  Swagger(Open API)
For opening documentation locally paste in your browser (http://localhost:3050/api) or exchange with your custom app env `PORT`.

## License

Nest is [MIT licensed](LICENSE).
