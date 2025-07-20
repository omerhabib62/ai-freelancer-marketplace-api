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
   - Create database: `ai_freelancer_marketplace`.
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
   - WebSocket: `/chat`

### Docker Setup

1. Build and run:

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
- **Recommendations**: `GET /recommendations/projects/:freelancerId`, `GET /recommendations/courses/:freelancerId`

### GraphQL

- **Queries**: `users`, `projects`, `courses`, `bids`
- **Mutations**: `createProject`, `placeBid`, `enrollCourse`, `submitQuiz`

Explore via Swagger (`/api`) or GraphQL playground (`/graphql`).

## Unique Features

- **AI Recommendations**: Suggests projects and courses based on freelancer skills/history ([Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)).
- **Learning Module**: Courses and quizzes for skill enhancement ([Modules](https://docs.nestjs.com/modules)).
- **Real-Time Chat**: Persistent messaging via WebSockets ([WebSockets](https://docs.nestjs.com/websockets/gateways)).
- **Competitive Bidding**: AI-suggested bids for competitiveness ([Pipes](https://docs.nestjs.com/pipes)).
- **Common Module**: Reusable utilities (e.g., logging interceptor, role guard) for maintainability ([Interceptors](https://docs.nestjs.com/interceptors), [Guards](https://docs.nestjs.com/guards)).

## Screenshots

- **Swagger UI**: [Insert screenshot]
- **GraphQL Playground**: [Insert screenshot]
- **Real-Time Chat**: [Insert screenshot]
- **AI Recommendations**: [Insert screenshot of recommended projects/courses]

## Deployment

Deployed at [insert live URL]. Use Docker for local/production deployment.

## Testing

- **Unit Tests**: Services and controllers (>80% coverage).
- **E2E Tests**: API endpoints and workflows.
Run tests:

```bash
npm run test
npm run test:e2e
```

## Future Enhancements

- Integrate real AI API (e.g., Hugging Face) for advanced recommendations.
- Add payment gateway for contracts.
- Implement notifications for bid/course updates.

## NestJS Documentation Coverage

This project covers all NestJS documentation topics:

- **Overview**: Controllers, Providers, Modules, Middleware, Exception Filters, Pipes, Guards, Interceptors.
- **Techniques**: Authentication, Database, Configuration, Validation, Serialization, File Upload, Task Queues.
- **Fundamentals**: Custom Providers, Custom Decorators, Dependency Injection.
- **CLI**: Scaffolding with NestJS CLI ([CLI Overview](https://docs.nestjs.com/cli/overview)).
- **Recipes**: OpenAPI, Task Queues.
- **Security**: Authentication, Authorization, Helmet, CORS.
- **GraphQL**: Dual API support.
- **Microservices**: Analytics processing.
- **WebSockets**: Real-time chat.
- **Testing**: Unit and e2e tests.

## Contributing

Fork the repository and submit pull requests. Report issues on [GitHub Issues](https://github.com/your-username/ai-freelancer-marketplace/issues).

## License

MIT License
