import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        RATE_LIMIT_WINDOW_MS: Joi.number().default(60000),
        RATE_LIMIT_MAX_REQUESTS: Joi.number().default(30),
      }),
    }),
  ],
})
export class ConfigModule {}
