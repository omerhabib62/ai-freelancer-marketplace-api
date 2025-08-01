import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import {
  NODE_ENV_DEVELOPMENT,
  NODE_ENV_PRODUCTION,
} from '../common/constants/config.constants';

// Load environment variables based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const configService = new ConfigService();
const password = configService.get<string>('DB_PASSWORD');
if (!password) throw new Error('Missing DB_PASSWORD in env');

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password,
  database: configService.get<string>('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: configService.get<string>('NODE_ENV') !== NODE_ENV_PRODUCTION,
  logging: configService.get<string>('NODE_ENV') === 'development', //. If set to true then query and error logging will be enabled. You can also specify different types of logging to be enabled, for example ["query", "error", "schema"]. Learn more about Logging. When in production it will be disabled.
  dropSchema: configService.get<string>('NODE_ENV') === NODE_ENV_DEVELOPMENT,
  cache: {
    type: 'redis',
    options: {
      host: configService.get<string>('REDIS_HOST') || 'redis',
      port: configService.get<number>('REDIS_PORT') || 6379,
    },
  },
};

// Export the DataSource instance for CLI commands
export default new DataSource(databaseConfig);
