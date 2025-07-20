# AI-Powered Freelancer Marketplace API with Learning Module

## Overview

The **AI-Powered Freelancer Marketplace API** is a robust backend application built with [NestJS](https://nestjs.com/), designed to facilitate a freelance platform where clients post projects, freelancers bid, and freelancers enhance their skills through a learning module. The platform integrates **AI-driven recommendations** for projects and courses, real-time chat, and analytics, making it a unique and scalable solution for modern freelance marketplaces.

This project demonstrates mastery of all [NestJS documentation](https://docs.nestjs.com/) topics, including controllers, modules, authentication, database integration, GraphQL, WebSockets, microservices, and more. It’s built with scalability and real-world applicability in mind, using a modern tech stack and best practices.

## Features

- **User Management**: Register, log in, and manage profiles for freelancers and clients with role-based access [](https://docs.nestjs.com/modules).
- **Project Management**: Clients post projects; freelancers bid with AI-suggested amounts/timelines [](https://docs.nestjs.com/techniques/validation).
- **Learning Module**: Freelancers access courses and quizzes to improve skills, with AI-personalized recommendations [](https://docs.nestjs.com/fundamentals/custom-providers).
- **Real-Time Chat**: WebSocket-based communication between clients and freelancers [](https://docs.nestjs.com/websockets/gateways).
- **File Uploads**: Upload project files or course materials securely [](https://docs.nestjs.com/techniques/file-upload).
- **AI Recommendations**: Mock AI service for project and course suggestions based on user history [](https://docs.nestjs.com/custom-decorators).
- **Analytics**: Microservices generate reports (e.g., freelancer earnings, course completion) [](https://docs.nestjs.com/techniques/queues).
- **Dual APIs**: REST and GraphQL endpoints for flexibility [](https://docs.nestjs.com/graphql/quick-start).
- **Security**: JWT authentication, role-based authorization, and secure headers [](https://docs.nestjs.com/security).
- **Documentation**: OpenAPI (Swagger) for API clarity [](https://docs.nestjs.com/openapi/introduction).
- **Testing**: Comprehensive unit and e2e tests with >80% coverage [](https://docs.nestjs.com/fundamentals/testing).

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM [](https://docs.nestjs.com/techniques/database)
- **Authentication**: JWT with `@nestjs/passport` [](https://docs.nestjs.com/security/authentication)
- **APIs**: REST (`@nestjs/platform-express`), GraphQL (`@nestjs/graphql`)
- **Real-Time**: WebSockets (`@nestjs/websockets`, `@nestjs/platform-socket.io`)
- **Task Queues**: Bull (`@nestjs/bull`) for background tasks
- **Documentation**: Swagger (`@nestjs/swagger`)
- **Testing**: Jest (`@nestjs/testing`)
- **Deployment**: Docker for containerization
- **Other**: Helmet, CORS, class-validator, class-transformer

## Project Structure
