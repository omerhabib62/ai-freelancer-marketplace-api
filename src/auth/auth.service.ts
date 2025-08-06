import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { RedisService } from '../common/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) { }

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

  async login(user: any, requestMessage?: string) {
    const payload = { sub: user.id, role: user.role };
    const userWithoutPassword = this.excludePassword(user);

    // Create a session for the user
    const sessionId = await this.redisService.createSession(user.id, {
      lastLogin: new Date(),
      role: user.role,
      deviceInfo: requestMessage || 'Unknown device'
    });
    return {
      accessToken: this.jwtService.sign(payload),
      sessionId,
      user: userWithoutPassword,
      message: requestMessage ?? 'Successfully logged-in',
    };
  }


  async logoutAll(userId: number) {
    const count = await this.redisService.deleteAllUserSessions(userId);
    return {
      success: true,
      message: `Successfully logged out from all devices (${count} sessions)`
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
    return { success: true, message: 'Logged out successfully' };
  }

  async getUserSessions(userId: number) {
    return this.redisService.getAllUserSessions(userId);
  }


  private excludePassword(user: any): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
