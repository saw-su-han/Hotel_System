import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  roomNumber: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  roomTypeId: number;
}
