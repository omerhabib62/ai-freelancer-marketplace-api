import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateToken(token: string): any {
    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const payload = jwt.verify(token, jwtSecret);
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
