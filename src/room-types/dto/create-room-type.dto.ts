import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Allow } from 'class-validator';

export class CreateRoomTypeDto {
  @ApiProperty()
  @IsString()
  roomType: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  roomId: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image?: any;

  @ApiProperty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsString()
  bathType: string;

  @ApiProperty()
  @IsString()
  viewType: string;
}
