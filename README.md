# Good Morning API

## Description
The **AI Email Generation API** is a backend service built with NestJS and OpenAI that allows users to generate professional, personalized, and context-aware emails.  
This project is containerized with Docker for easy setup and development, and includes ready-to-use scripts for testing and database migrations.

---

## Tech Stack
- **[NestJS](https://nestjs.com/)** – Backend framework
- **[OpenAI API](https://platform.openai.com/)** – AI-powered email generation
- **[TypeORM](https://typeorm.io/)** – Database ORM (if using persistence)
- **Docker & Docker Compose** – Containerized development
- **Jest** – Testing framework

---

## Prerequisites

- Docker
- Docker Compose

---

## Installation and Setup

1. Clone the repository
2. Navigate to the project directory

## Run the Project

Start the application using Docker:

```shell
docker-compose up
```

## Usage
When you need to install new packages, run NestJS CLI commands, or manage migrations:

```shell
# Access the Node environment inside the container
docker container exec -it good-morning-api-app-1 bash
# Install a package
npm install package-name
# Create a new migration file
npm run migration:create ./src/migrations/name-of-the-migration-file
```

## Run Tests
To run tests, first access the Node environment:

```shell
# Access the Node environment
docker container exec -it good-morning-api-app-1 bash
# Run unit tests
npm run test
# Run end-to-end (e2e) tests
npm run test:e2e
```