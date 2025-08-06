import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppLoggerService } from './common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const appVersion = `v${configService.get<string>('API_VERSION')}`;
  const appName = configService.get<string>('API_NAME');
  const appDescription = configService.get<string>('API_DESCRIPTION');
  const port = configService.get<number>('PORT');
  const apiBaseUrl =
    configService.get<string>('API_BASE_URL') || `http://localhost:${port}`;
  console.log(`API_BASE_URL: ${apiBaseUrl}`);
  const globalPrefix = `${appVersion}/api`;

  // Obtain the AppLoggerService instance from the NestJS container
  const logger = app.get(AppLoggerService);

  logger.log(`Initialized app Logger`);

  // Set a global prefix for all routes (e.g., /v1/api/...)
  app.setGlobalPrefix(globalPrefix);

  // Tell class-validator to use NestJS's dependency injection container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Define a whitelist for allowed origins to handle CORS
  const whiteList = ['http://localhost:3000'];

  // Enable CORS with custom logic to check the origin against the whitelist
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whiteList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.use(
    bodyParser.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  // Enable global validation for incoming requests using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enables DTO transformation
      whitelist: true, // Removes fields not in DTO
      forbidNonWhitelisted: false, // Allows non-whitelisted fields
    }),
  );
  const swaggerServerUrl = `${apiBaseUrl}`;
  console.log(`swaggerServerUrl => ${swaggerServerUrl}`);
  const documentConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion(appVersion)
    .addServer(swaggerServerUrl, `${appName} ${appVersion}`)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'access-token', // This is a key to reference this security scheme
    )
    // .addTag('cats')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory, {
    swaggerOptions: {
      tryItOutEnabled: true,
      displayRequestDuration: true,
      persistAuthorization: true,
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      requestSnippets: {
        enabled: true,
        generators: {
          curl_bash: {
            title: 'cURL (Bash)',
            syntax: 'bash',
          },
        },
        defaultExpanded: true,
      },
      showExtensions: true,
      showCommonExtensions: true,
    },
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(port);
}
bootstrap();
