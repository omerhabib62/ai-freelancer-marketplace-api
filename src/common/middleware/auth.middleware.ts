import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }
    const token = authHeader.split(' ')[1];
    const payload = this.authService.validateToken(token);
    (req as any).user = payload;
    // Example: Check for required role (e.g., 'admin')
    // if (!(payload.roles && payload.roles.includes('admin'))) {
    //   throw new ForbiddenException('Insufficient role');
    // }
    next();
  }
}
