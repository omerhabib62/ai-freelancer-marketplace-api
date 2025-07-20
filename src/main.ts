import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Use LoggingInterceptor from CommonModule provider system

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const loggingInterceptor = app.get('LoggingInterceptor');
  app.useGlobalInterceptors(loggingInterceptor);
  await app.listen(3000);
}
bootstrap();
