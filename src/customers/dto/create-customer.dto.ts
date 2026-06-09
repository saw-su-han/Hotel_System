import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  phoneNumber: string;

  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  @IsNotEmpty()
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  nrc: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsBoolean()
  @IsOptional()
  isMember?: boolean;

  @IsString()
  @IsOptional()
  membershipType?: string;

  @IsDateString()
  @IsOptional()
  membershipExpiry?: string;
}
