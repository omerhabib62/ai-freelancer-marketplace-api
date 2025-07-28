import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { createDataSourceOptions } from '../data-source';

// Load the production environment file by default
dotenv.config({ path: '.env.production.local' });

// If NODE_ENV is not 'prod', override with development environment
if (process.env.NODE_ENV !== 'prod') {
  console.log('Loading development environment');
  dotenv.config({ path: '.env.dev' });
}

// This will load environment values.
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath:
    process.env.NODE_ENV === 'prod' ? '.env.production.local' : `.env.dev`,
});

const configService = new ConfigService();
console.log(`process.env.NODE_ENV : ${process.env.NODE_ENV}`);
console.log('DB_TYPE from config:', configService.get('DB_TYPE'));

// This will be used by the cli
export default new DataSource(createDataSourceOptions(new ConfigService()));
