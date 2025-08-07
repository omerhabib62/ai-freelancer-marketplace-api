import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../config/config.module';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../common/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsEmailUniqueConstraint } from '../common/validators/is-email-unique-constraint.validator';
import { RedisModule } from '../common/modules/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UsersModule,
    RedisModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_IN_SECONDS'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    LocalAuthGuard,
    IsEmailUniqueConstraint,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
