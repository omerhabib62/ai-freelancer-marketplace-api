# AI-Powered Freelancer Marketplace API with Learning Module

## Overview

The **AI-Powered Freelancer Marketplace API** is a scalable backend application built with [NestJS](https://nestjs.com/), enabling a freelance platform where clients post projects, freelancers bid with AI-suggested parameters, and freelancers enhance skills through a learning module with AI-personalized course recommendations. It features real-time chat, analytics, and a shared **Common Module** for reusable utilities, demonstrating mastery of all [NestJS documentation](https://docs.nestjs.com/) topics.

This project showcases advanced backend development with AI integration, making it ideal for portfolios targeting ed-tech or freelance platform roles.

## Features

- **User Management**: Register, log in, and manage profiles for freelancers and clients with role-based access ([Controllers](https://docs.nestjs.com/controllers), [Providers](https://docs.nestjs.com/providers), [Modules](https://docs.nestjs.com/modules)).
- **Project Management**: Clients post projects; freelancers bid with AI-suggested amounts/timelines ([Pipes](https://docs.nestjs.com/pipes), [Validation](https://docs.nestjs.com/techniques/validation)).
- **Bidding System**: Competitive bidding with AI-driven suggestions ([Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)).
- **Learning Module**: Courses and quizzes for freelancers to improve skills, with AI recommendations ([Modules](https://docs.nestjs.com/modules)).
- **Real-Time Chat**: WebSocket-based client-freelancer communication ([WebSockets](https://docs.nestjs.com/websockets/gateways)).
- **File Uploads**: Secure uploads for project files and course materials ([File Upload](https://docs.nestjs.com/techniques/file-upload)).
- **AI Recommendations**: Mock AI service for project and course suggestions ([Custom Decorators](https://docs.nestjs.com/custom-decorators)).
- **Analytics**: Microservices for reports (e.g., earnings, course completion) ([Microservices](https://docs.nestjs.com/microservices/basics), [Task Queues](https://docs.nestjs.com/techniques/queues)).
- **Common Module**: Reusable utilities (pipes, guards, interceptors, decorators) for cross-cutting concerns ([Pipes](https://docs.nestjs.com/pipes), [Guards](https://docs.nestjs.com/guards), [Interceptors](https://docs.nestjs.com/interceptors)).
- **APIs**: REST and GraphQL endpoints ([GraphQL](https://docs.nestjs.com/graphql/quick-start)).
- **Security**: JWT authentication, role-based authorization, secure headers ([Security](https://docs.nestjs.com/security)).
- **Documentation**: OpenAPI (Swagger) for API clarity ([OpenAPI](https://docs.nestjs.com/openapi/introduction)).
- **Testing**: Unit and e2e tests with >80% coverage ([Testing](https://docs.nestjs.com/fundamentals/testing)).

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM ([Database](https://docs.nestjs.com/techniques/database))
- **Authentication**: JWT with `@nestjs/passport` ([Authentication](https://docs.nestjs.com/security/authentication))
- **APIs**: REST (`@nestjs/platform-express`), GraphQL (`@nestjs/graphql`)
- **Real-Time**: WebSockets (`@nestjs/websockets`, `@nestjs/platform-socket.io`)
- **Task Queues**: Bull (`@nestjs/bull`)
- **Documentation**: Swagger (`@nestjs/swagger`)
- **Testing**: Jest (`@nestjs/testing`)
- **Deployment**: Docker
- **Other**: Helmet, CORS, class-validator, class-transformer

## Project Structure

```
ai-freelancer-marketplace/
├── src/
│   ├── auth/                     # Authentication module
│   ├── users/                    # User management
│   ├── projects/                 # Project management
│   ├── bids/                     # Bidding system
│   ├── learning/                 # Courses and quizzes
│   ├── chat/                     # WebSocket-based chat
│   ├── analytics/                # Microservices for reports
│   ├── common/                   # Shared utilities (pipes, guards, interceptors, decorators, entities)
│   ├── config/                   # Environment configuration
│   └── main.ts                   # Application bootstrap
├── test/                         # Unit and e2e tests
├── Dockerfile                    # Docker configuration
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

- `Dockerfile`: Defines the Docker image for the API service.
- `docker-compose.yml`: Configures the API and PostgreSQL services.
- `.env`: Stores environment variables for configuration.
- `src/`: Contains the application source code (assumed).

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-freelancer-marketplace
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root based on the provided `.env.example` (if available) or configure the following variables:

#### Environment Variables

| Variable        | Description                                      |
|-----------------|--------------------------------------------------|
| `NODE_ENV`      | Node.js environment (e.g., development, production) |
| `PORT`          | Port for the API service                        |
| `DB_TYPE`       | Database type (e.g., postgres)                  |
| `DB_HOST`       | Database host (use service name `postgres` in Docker) |
| `DB_PORT`       | Database port                                   |
| `DB_NAME`       | Database name                                   |
| `DB_USER`       | Database username                               |
| `DB_PASSWORD`   | Database password                               |
| `DATABASE_URL`  | Full database connection string (e.g., `postgres://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>`) |
| `JWT_SECRET`    | Secret key for JWT authentication               |

**Note**: Do not hardcode sensitive values in the `.env` file in version control. Ensure `.env` is added to `.gitignore`.

### 3. Build and Run with Docker Compose

```bash
docker-compose up --build
```

This command:

- Builds the API service image using the `Dockerfile`.
- Starts the PostgreSQL service using the `postgres:14-alpine` image.
- Maps the API port and PostgreSQL port to the host as defined in `.env`.
- Mounts the project directory to `/usr/src/app` in the API container for development.

### 4. Access the Application

- **API**: Available at `http://localhost:<PORT>` (replace `<PORT>` with the value from `.env`).
- **PostgreSQL**: Connect using a tool like `psql` or a GUI client at `localhost:<DB_PORT>` with the credentials from `.env`.

### 5. Stop the Services

```bash
docker-compose down
```

To remove volumes (including database data):

```bash
docker-compose down -v
```

## Development

- The API service uses a volume mount to reflect code changes in real-time during development.
- If `node_modules` changes, rebuild the image with `docker-compose up --build`.

## Troubleshooting

- **Database Connection Issues**: Ensure `DB_HOST` is set to `postgres` (the service name) in the `.env` file when running in Docker.
- **Port Conflicts**: Check if the ports defined in `.env` (`PORT`, `DB_PORT`) are already in use.
- **Logs**: View logs with `docker-compose logs`.

## Security Notes

- Keep the `.env` file secure and out of version control.
- Use strong passwords and secrets for `DB_PASSWORD` and `JWT_SECRET`.
- Regularly update dependencies and Docker images.
