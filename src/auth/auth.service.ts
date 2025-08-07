import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dtos/register.dto';
import { User } from '../common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { RedisService } from '../common/services/redis.service';
import { LoginDto } from './dtos/login.dto';
import { AuthorizedUser } from './interfaces/authorized-user.interface';

@Injectable()
export class AuthService {
  private readonly loggerService = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  validateToken(token: string): any {
    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const payload = jwt.verify(token, jwtSecret);
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async validateUser(
    userEmail: string,
    userPassword: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user: User | null = await this.usersService.findByEmail(userEmail);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) {
      return null;
    }
    return this.excludePassword(user);
  }

  async authorize(
    userService: UsersService,
    loginDto: LoginDto,
  ): Promise<AuthorizedUser> {
    const user = await userService.findByEmail(loginDto.email);
    if (!user) {
      this.loggerService.error(
        `Login failed for email: ${loginDto.email} due to user not found`,
      );
      return {
        success: false,
        message: 'Login failed',
        data: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.loggerService.error(
        `Login failed for email: ${loginDto.email} due to incorrect password`,
      );
      return {
        success: false,
        message: 'Login failed',
        data: null,
      };
    }

    this.loggerService.log(`User ${user.email} logged in successfully`);
    return {
      success: true,
      message: 'Login successful',
      data: user,
    };
  }

  async login(user: User, requestMessage?: string) {
    const payload = { sub: user.id, role: user.role };
    const userWithoutPassword = this.excludePassword(user);

    // Create a session with longer TTL (30 days)
    const sessionId = await this.redisService.createSession(
      user.id,
      {
        lastLogin: new Date(),
        role: user.role,
        deviceInfo: requestMessage || 'Unknown device',
      },
      30 * 24 * 60 * 60,
    ); // 30 days in seconds

    // Generate access token (short-lived)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION_IN_SECONDS', '60s'),
    });

    // Generate refresh token (long-lived)
    const refreshToken = this.jwtService.sign(
      { sub: user.id, sessionId },
      { expiresIn: '30d' },
    );

    // Store refresh token in Redis
    await this.redisService.client.set(
      `refresh_token:${sessionId}`,
      refreshToken,
      { EX: 30 * 24 * 60 * 60 }, // 30 days
    );

    return {
      accessToken,
      refreshToken,
      sessionId,
      user: userWithoutPassword,
      message: requestMessage ?? 'Successfully logged-in',
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken);
      const userId = payload.sub;
      const sessionId = payload.sessionId;

      // Check if refresh token exists in Redis
      const storedToken = await this.redisService.client.get(
        `refresh_token:${sessionId}`,
      );
      if (!storedToken || storedToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Get user from database
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new access token
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, role: user.role },
        {
          expiresIn: this.configService.get('JWT_EXPIRATION_IN_SECONDS', '60s'),
        },
      );

      return {
        accessToken: newAccessToken,
        user: this.excludePassword(user),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logoutAll(userId: number) {
    // Get all sessions
    const sessions = await this.redisService.getAllUserSessions(userId);

    // Delete refresh tokens for all sessions
    for (const session of sessions) {
      await this.redisService.client.del(`refresh_token:${session.sessionId}`);
    }

    // Delete all sessions
    const count = await this.redisService.deleteAllUserSessions(userId);

    return {
      success: true,
      message: `Successfully logged out from all devices (${count} sessions)`,
    };
  }

  async register(dto: RegisterDto) {
    const createUserDto: CreateUserDto = {
      email: dto.email,
      password: dto.password,
      role: dto.role,
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
    };
    const user = await this.usersService.create(createUserDto);
    return this.login(user, `Successfully signed up as ${dto.role}`);
  }

  async logout(userId: number, sessionId: string) {
    await this.redisService.deleteSession(userId, sessionId);
    await this.redisService.client.del(`refresh_token:${sessionId}`);
    return { success: true, message: 'Logged out successfully' };
  }
  async getUserSessions(userId: number) {
    return this.redisService.getAllUserSessions(userId);
  }

  private excludePassword(user: any): Omit<User, 'password'> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== 'password'),
    ) as Omit<User, 'password'>;
  }
}
