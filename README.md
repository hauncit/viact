# Viact Application

## Introduction

This repository contains the source code for the Viact application. Viact is a web application built with a frontend and backend, serving as a platform for [describe the purpose of the application].

## Getting Started

Follow these steps to set up the Viact application locally:

### Prerequisites

- Docker

### Setup

1. Navigate to the root directory of the cloned repository:

   ```bash
   cd viact
   ```

2. Copy the `.env_example` file to `.env`:

   ```bash
   cp .env_example .env
   ```

3. Navigate to the `viact-service` directory:

   ```bash
   cd viact-service
   ```

4. Copy the `.env_example` file to `.env`:

   ```bash
   cp .env_example .env
   ```

### Running the Application

1. Navigate back to the root directory:

   ```bash
   cd ..
   ```

2. Start the Docker containers with Docker Compose:

   ```bash
   docker-compose up
   ```

3. Wait for the Docker containers to finish setting up.

### Troubleshooting
If you encounter a database connection issue, make sure to update the MYSQL_HOST variable in the source code of the viact-service to the name of the MySQL container used by Docker.

### Access URLs

- Frontend: [localhost:3000](http://localhost:3000)
- Backend: [localhost:4000](http://localhost:4000)
- Swagger Documentation: [localhost:4000/docs](http://localhost:4000/docs)

## License

This project is licensed under the [MIT License](LICENSE).
