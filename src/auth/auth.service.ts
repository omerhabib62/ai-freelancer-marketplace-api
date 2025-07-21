import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateToken(token: string): any {
    try {
      const jwtSecret = this.configService.getJwtSecret();
      const payload = jwt.verify(token, jwtSecret);
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
