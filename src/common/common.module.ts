import { Module } from '@nestjs/common';
import { ParseIntPipe } from './pipes/parse-int.pipe';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  providers: [ParseIntPipe, RolesGuard, LoggingInterceptor],
  exports: [ParseIntPipe, RolesGuard, LoggingInterceptor],
})
export class CommonModule {}
