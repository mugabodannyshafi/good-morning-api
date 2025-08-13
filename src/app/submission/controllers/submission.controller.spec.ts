import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from '../services/submission.service';
import { CreateSubmissionDto } from '../dto/create-submission.dto';

describe('SubmissionController', () => {
  let controller: SubmissionController;
  let service: SubmissionService;

  const mockCreateSubmissionDto: CreateSubmissionDto = {
    name: 'John Doe',
    phone: '+250788123456',
    email: 'johndoe@example.com'
  };

  const mockResult = {
    name: 'John Doe',
    phone: '+250788123456',
    email: 'johndoe@example.com'
  };

  const mockSubmissionService = {
    create: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionController],
      providers: [
        {
          provide: SubmissionService,
          useValue: mockSubmissionService
        }
      ],
    }).compile();

    controller = module.get<SubmissionController>(SubmissionController);
    service = module.get<SubmissionService>(SubmissionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have service injected', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a submission successfully', async () => {
      mockSubmissionService.create.mockResolvedValue(mockResult);

      const result = await controller.create(mockCreateSubmissionDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateSubmissionDto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
    });

    it('should handle service errors', async () => {
      const errorMessage = 'Database connection failed';
      mockSubmissionService.create.mockRejectedValue(new Error(errorMessage));

      await expect(controller.create(mockCreateSubmissionDto)).rejects.toThrow(errorMessage);
      expect(service.create).toHaveBeenCalledWith(mockCreateSubmissionDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should pass correct DTO to service', async () => {
      const customDto: CreateSubmissionDto = {
        name: 'Jane Smith',
        phone: '+250788987654',
        email: 'jane.smith@example.com'
      };
      const customResult = {
        name: 'Jane Smith',
        phone: '+250788987654',
        email: 'jane.smith@example.com'
      };
      mockSubmissionService.create.mockResolvedValue(customResult);

      const result = await controller.create(customDto);

      expect(service.create).toHaveBeenCalledWith(customDto);
      expect(result).toEqual(customResult);
    });

    it('should return data in expected format', async () => {
      mockSubmissionService.create.mockResolvedValue(mockResult);

      const result = await controller.create(mockCreateSubmissionDto);

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('email');
      expect(typeof result.name).toBe('string');
      expect(typeof result.phone).toBe('string');
      expect(typeof result.email).toBe('string');
    });

    it('should handle empty DTO', async () => {
      const emptyDto = {} as CreateSubmissionDto;
      mockSubmissionService.create.mockResolvedValue({});

      const result = await controller.create(emptyDto);
      expect(service.create).toHaveBeenCalledWith(emptyDto);
      expect(result).toEqual({});
    });
  });
});