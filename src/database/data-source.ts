import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as fs from 'fs';
import * as path from 'path';

export const createDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions & SeederOptions => {
  const dbType = configService.get<
    'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mongodb'
  >('DB_TYPE');

  console.log('DB_TYPE:', dbType);
  console.log('DB_HOST:', configService.get<string>('DB_HOST'));
  console.log('DB_PORT:', configService.get<number>('DB_PORT'));
  console.log('DB_NAME:', configService.get<number>('DB_NAME'));

  if (!dbType) {
    throw new Error('DB_TYPE is not defined in the environment variables');
  }

  const projectRoot = process.cwd();
  const isDevelopment = configService.get<string>('NODE_ENV') == 'development';
  const fileExtension = isDevelopment ? 'ts' : 'js'; // Use 'ts' for development, 'js' for production

  // Read SSL certificate in production
  let sslOptions = {};
  if (process.env.NODE_ENV === 'prod') {
    const certificatePath = path.join(projectRoot, 'eu-west-2-bundle.pem');
    const certificate = fs.readFileSync(certificatePath);
    sslOptions = {
      extra: {
        ssl: {
          ca: certificate,
        },
        trustServerCertificate: true,
      },
    };
  }

  return {
    type: dbType,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    synchronize: false,
    logging: false,
    entities: [
      path.join(
        projectRoot,
        isDevelopment
          ? `dist/**/*.entity.js`
          : `dist/**/*.entity.${fileExtension}`,
      ),
    ],
    migrations: [
      path.join(projectRoot, `/dist/src/database/migrations/**/*.js`),
    ],
    seeds: [path.join(projectRoot, `/dist/src/database/seeds/**/*.js`)],
    factories: [
      path.join(projectRoot, `/dist/src/database/factories/**/*.js}`),
    ],
    subscribers: [],
    migrationsTableName: '_migrations',
    migrationsRun: false,
  };
};

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: createDataSourceOptions,
});
