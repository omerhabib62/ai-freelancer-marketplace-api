# AI-Powered Freelancer Marketplace API with Learning Module

## Overview

The **AI-Powered Freelancer Marketplace API** is a robust backend application built with [NestJS](https://nestjs.com/), designed to facilitate a freelance platform where clients post projects, freelancers bid, and freelancers enhance their skills through a learning module. The platform integrates **AI-driven recommendations** for projects and courses, real-time chat, and analytics, making it a unique and scalable solution for modern freelance marketplaces.

This project demonstrates mastery of all [NestJS documentation](https://docs.nestjs.com/) topics, including controllers, modules, authentication, database integration, GraphQL, WebSockets, microservices, and more. It’s built with scalability and real-world applicability in mind, using a modern tech stack and best practices.

## Features

- **User Management**: Register, log in, and manage profiles for freelancers and clients with role-based access ([Controllers](https://docs.nestjs.com/controllers), [Providers](https://docs.nestjs.com/providers), [Modules](https://docs.nestjs.com/modules)).
- **Project Management**: Clients post projects; freelancers bid with AI-suggested amounts/timelines ([Pipes](https://docs.nestjs.com/pipes), [Validation](https://docs.nestjs.com/techniques/validation)).
- **Learning Module**: Freelancers access courses and quizzes to improve skills, with AI-personalized recommendations ([Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)).
- **Real-Time Chat**: WebSocket-based communication between clients and freelancers ([WebSockets](https://docs.nestjs.com/websockets/gateways)).
- **File Uploads**: Upload project files or course materials securely ([File Upload](https://docs.nestjs.com/techniques/file-upload)).
- **AI Recommendations**: Mock AI service for project and course suggestions based on user history ([Custom Decorators](https://docs.nestjs.com/custom-decorators)).
- **Analytics**: Microservices generate reports (e.g., freelancer earnings, course completion) ([Microservices](https://docs.nestjs.com/microservices/basics), [Task Queues](https://docs.nestjs.com/techniques/queues)).
- **Dual APIs**: REST and GraphQL endpoints for flexibility ([GraphQL](https://docs.nestjs.com/graphql/quick-start)).
- **Security**: JWT authentication, role-based authorization, and secure headers ([Security](https://docs.nestjs.com/security)).
- **Documentation**: OpenAPI (Swagger) for API clarity ([OpenAPI](https://docs.nestjs.com/openapi/introduction)).
- **Testing**: Comprehensive unit and e2e tests with >80% coverage ([Testing](https://docs.nestjs.com/fundamentals/testing)).

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM ([Database](https://docs.nestjs.com/techniques/database))
- **Authentication**: JWT with `@nestjs/passport` ([Authentication](https://docs.nestjs.com/security/authentication))
- **APIs**: REST (`@nestjs/platform-express`), GraphQL (`@nestjs/graphql`)
- **Real-Time**: WebSockets (`@nestjs/websockets`, `@nestjs/platform-socket.io`)
- **Task Queues**: Bull (`@nestjs/bull`) for background tasks
- **Documentation**: Swagger (`@nestjs/swagger`)
- **Testing**: Jest (`@nestjs/testing`)
- **Deployment**: Docker for containerization
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
│   ├── shared/                   # Pipes, guards, interceptors
│   ├── config/                   # Environment configuration
│   └── main.ts                   # Application bootstrap
├── test/                         # Unit and e2e tests
├── Dockerfile                    # Docker configuration
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Docker (optional for deployment)
- NestJS CLI (`npm i -g @nestjs/cli`)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/ai-freelancer-marketplace.git
   cd ai-freelancer-marketplace
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file:

   ```plaintext
   DATABASE_URL=postgres://postgres:password@localhost:5432/ai_freelancer_marketplace
   JWT_SECRET=secretKey
   ```

4. **Set Up PostgreSQL**:
   - Create a database named `ai_freelancer_marketplace`.
   - Update `DATABASE_URL` in `.env` if needed.
5. **Run Migrations**:

   ```bash
   npm run typeorm:migration:run
   ```

6. **Start the Application**:

   ```bash
   npm run start:dev
   ```

   - REST API: `http://localhost:3000`
   - Swagger: `http://localhost:3000/api`
   - GraphQL: `http://localhost:3000/graphql`

### Docker Setup

1. Build and run with Docker:

   ```bash
   docker build -t ai-freelancer-marketplace .
   docker run -p 3000:3000 --env-file .env ai-freelancer-marketplace
   ```

## API Endpoints

### REST

- **Users**: `POST /users/register`, `POST /users/login`, `GET /users/profile`
- **Projects**: `POST /projects`, `GET /projects`, `PUT /projects/:id`
- **Bids**: `POST /bids`, `GET /bids/project/:projectId`
- **Courses**: `POST /courses`, `GET /courses`
- **Quizzes**: `POST /quizzes`, `POST /quizzes/submit`
- **Chat**: WebSocket at `/chat`
- **Analytics**: `GET /analytics/earnings/:freelancerId`

### GraphQL

- Queries: `users`, `projects`, `courses`
- Mutations: `createProject`, `placeBid`, `enrollCourse`

Explore the full API via Swagger at `/api` or GraphQL playground at `/graphql`.

## Unique Features

- **AI Recommendations**: Suggests projects and courses based on freelancer skills and history, implemented with a mock AI service ([Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)).
- **Learning Module**: Freelancers enhance skills through courses and quizzes, with progress tracking ([Modules](https://docs.nestjs.com/modules)).
- **Real-Time Chat**: Persistent client-freelancer messaging via WebSockets ([WebSockets](https://docs.nestjs.com/websockets/gateways)).
- **Competitive Bidding**: AI-suggested bids for freelancers, enhancing competitiveness ([Pipes](https://docs.nestjs.com/pipes)).

## Screenshots

- **Swagger UI**: [Insert screenshot of Swagger interface]
- **GraphQL Playground**: [Insert screenshot of GraphQL queries]
- **Real-Time Chat**: [Insert screenshot of WebSocket chat]

## Deployment

The API is deployed at [insert live URL, e.g., Heroku/Render]. Use Docker for local or production deployment.

## Testing

- **Unit Tests**: Cover services and controllers (>80% coverage).
- **E2E Tests**: Test API endpoints and workflows.
Run tests:

```bash
npm run test
npm run test:e2e
```

## Future Enhancements

- Integrate a real AI API (e.g., Hugging Face) for advanced recommendations.
- Add payment gateway integration for project contracts.
- Implement notifications for bid updates.

## NestJS Documentation Coverage

This project implements all NestJS documentation topics:

- **Overview**: Controllers, Providers, Modules, Middleware, Exception Filters, Pipes, Guards, Interceptors.
- **Techniques**: Authentication, Database, Configuration, Validation, Serialization.
- **Fundamentals**: Custom Providers, Custom Decorators, Dependency Injection.
- **CLI**: Used for scaffolding ([CLI Overview](https://docs.nestjs.com/cli/overview)).
- **Recipes**: OpenAPI, Task Queues.
- **Security**: Authentication, Authorization, Helmet, CORS.
- **GraphQL**: Dual API support.
- **Microservices**: Analytics processing.
- **WebSockets**: Real-time chat.
- **Testing**: Unit and e2e tests.

## Contributing

Feel free to fork the repository and submit pull requests. Report issues on [GitHub Issues](https://github.com/your-username/ai-freelancer-marketplace/issues).

## License

MIT License
