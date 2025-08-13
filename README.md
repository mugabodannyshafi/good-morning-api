# Good Morning API

## Description

The Good Morning API is a simple NestJS service that receives user submissions (name, phone, email) and stores them in a PostgreSQL database. It is containerized with Docker for easy deployment.

## Prerequisites

- Docker
- Docker Compose

## Installation and Setup

1. Clone the repository
2. Navigate to the project directory

## Run the Project

Start the application using Docker:

```bash
docker-compose up
```

Usage
When you need to install new packages, run NestJS CLI commands, or manage migrations:

# Access the Node environment inside the container

docker container exec -it good-morning-api-app-1 bash

# Install a package

npm install package-name

# Create a new migration file

npm run migration:create ./src/migrations/name-of-the-migration-file

Run Tests
To run tests, first access the Node environment:

# Access the Node environment

docker container exec -it good-morning-api-app-1 bash

# Run unit tests

npm run test

# Run end-to-end (e2e) tests

npm run test:e2e
