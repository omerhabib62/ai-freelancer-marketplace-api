import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Example: Basic input validation for JSON body
    if (req.method === 'POST' || req.method === 'PUT') {
      if (!req.is('application/json')) {
        throw new BadRequestException('Content-Type must be application/json');
      }
      if (!req.body || typeof req.body !== 'object') {
        throw new BadRequestException('Invalid or missing request body');
      }
      // Add more validation logic as needed
    }
    next();
  }
}
