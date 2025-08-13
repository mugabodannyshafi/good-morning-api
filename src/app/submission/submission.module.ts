import { Module } from '@nestjs/common';
import { SubmissionController } from './controllers/submission.controller';
import { SubmissionService } from './services/submission.service';

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
