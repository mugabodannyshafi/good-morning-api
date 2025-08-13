import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionService } from './submission.service';
import { EntityManager } from 'typeorm';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { AppModule } from '../../../app/app.module';
import { Submission } from '../../../database/entities/submission.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateSubmissionDto } from '../dto/create-submission.dto';

describe('SubmissionService', () => {
  let service: SubmissionService;
  let database: EntityManager;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [SubmissionService],
      imports: [AppModule]
    }).compile();

    service = module.get<SubmissionService>(SubmissionService);
    database = module.get<EntityManager>(getEntityManagerToken());
  });

  afterEach(async () => {
    await database.deleteAll(Submission);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a submission with valid data', async () => {
      const createSubmissionDto: CreateSubmissionDto = {
        name: 'John Doe',
        phone: '+250781567627',
        email: 'john.doe@example.com'
      };

      const result = await service.create(createSubmissionDto);

      expect(result).toEqual({
        name: 'John Doe',
        phone: '+250781567627',
        email: 'john.doe@example.com'
      });

      const savedSubmission = await database.findOne(Submission, { 
        where: { phone: '+250781567627' } 
      });
      expect(savedSubmission).toBeDefined();
      expect(savedSubmission?.name).toBe('John Doe');
      expect(savedSubmission?.email).toBe('john.doe@example.com');
    });
    it('should create a submission with valid international phone number', async () => {
      const createSubmissionDto: CreateSubmissionDto = {
        name: 'Alice Johnson',
        phone: '+44 20 7946 0958',
        email: 'alice.johnson@example.com'
      };

      const result = await service.create(createSubmissionDto);

      expect(result).toEqual({
        name: 'Alice Johnson',
        phone: '+44 20 7946 0958',
        email: 'alice.johnson@example.com'
      });

      const savedSubmission = await database.findOne(Submission, { 
        where: { email: 'alice.johnson@example.com' } 
      });
      expect(savedSubmission).toBeDefined();
      expect(savedSubmission?.phone).toBe('+44 20 7946 0958');
    });

    it('should throw BadRequestException for invalid phone number', async () => {
      const invalidDto: CreateSubmissionDto = {
        name: 'Invalid User',
        phone: 'invalid-phone-123',
        email: 'invalid@example.com'
      };

      await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
      await expect(service.create(invalidDto)).rejects.toThrow('Invalid phone number');

      const savedSubmission = await database.findOne(Submission, { 
        where: { email: 'invalid@example.com' } 
      });
      expect(savedSubmission).toBeNull();
    });
  });
});