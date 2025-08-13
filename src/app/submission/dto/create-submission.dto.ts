import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the person' })
  name: string;

  @ApiProperty({ example: '+250788123456', description: 'Phone number of the person' })
  phone: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email address of the person' })
  email: string;
}
