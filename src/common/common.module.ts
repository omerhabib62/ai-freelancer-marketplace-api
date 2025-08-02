import { Module } from '@nestjs/common';
import { ParseIntPipe } from './pipes/parse-int.pipe';
import { RolesGuard } from './guards/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { User } from './entities/user.entity';
import { JobProject } from './entities/job-project.entity';
import { Bid } from './entities/bid.entity';
import { Course } from './entities/course.entity';
import { Enrollment } from './entities/enrollment.entity';
import { ChatMessage } from './entities/chat-message.entity';
import { Quiz } from './entities/quiz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      JobProject,
      Bid,
      Course,
      Quiz,
      Enrollment,
      ChatMessage,
    ]),
  ],
  providers: [ParseIntPipe, RolesGuard, LoggingInterceptor],
  exports: [ParseIntPipe, RolesGuard, LoggingInterceptor, TypeOrmModule],
})
export class CommonModule {}
