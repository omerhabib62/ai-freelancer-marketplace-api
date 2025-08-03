import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from '../common/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
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

  async login(user: any) {
    const payload = { sub: user.id, role: user.role };
    const userWithoutPassword = this.excludePassword(user);
    return {
      accessToken: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.create(dto);
    return this.login(user);
  }

  private excludePassword(user: any): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
