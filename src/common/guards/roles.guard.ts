import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(/* context: ExecutionContext */): boolean {
    // Implement role-based logic here
    return true;
  }
}
