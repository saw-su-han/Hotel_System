import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
    description: 'User password',
  })
  @MinLength(6)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
