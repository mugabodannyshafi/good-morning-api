import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateSubmissionDto } from '../dto/create-submission.dto';
import { EntityManager } from 'typeorm';
import { Submission } from '../../../database/entities/submission.entity';
import { isValidPhoneNumber } from 'libphonenumber-js';

@Injectable()
export class SubmissionService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createSubmissionDto: CreateSubmissionDto) {
    if (!isValidPhoneNumber(createSubmissionDto.phone)) {
      throw new BadRequestException('Invalid phone number');
    }

    const submission = this.entityManager.create(Submission, createSubmissionDto);
    const savedSubmission = await this.entityManager.save(submission);
    
    return {
      name: savedSubmission.name,
      phone: savedSubmission.phone,
      email: savedSubmission.email,
    };
  }
}