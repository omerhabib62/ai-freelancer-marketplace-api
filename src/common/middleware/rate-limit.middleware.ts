import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { Request, Response, NextFunction } from 'express';

const rateLimitMap = new Map<string, { count: number; last: number }>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const now = Date.now();
    const WINDOW_MS =
      Number(this.configService.get('RATE_LIMIT_WINDOW_MS')) || 60 * 1000;
    const MAX_REQUESTS =
      Number(this.configService.get('RATE_LIMIT_MAX_REQUESTS')) || 30;
    const entry = rateLimitMap.get(ip) || { count: 0, last: now };
    if (now - entry.last > WINDOW_MS) {
      entry.count = 1;
      entry.last = now;
    } else {
      entry.count++;
    }
    if (entry.count > MAX_REQUESTS) {
      throw new BadRequestException('Rate limit exceeded');
    }
    rateLimitMap.set(ip, entry);
    next();
  }
}
