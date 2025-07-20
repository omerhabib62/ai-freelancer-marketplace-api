import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { BidsModule } from './bids/bids.module';
import { LearningModule } from './learning/learning.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProjectsModule, BidsModule, LearningModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
