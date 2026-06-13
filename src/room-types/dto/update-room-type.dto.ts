import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomTypeDto } from './create-room-type.dto';
import { Type } from 'class-transformer';
import { Allow, IsNumber, IsString } from 'class-validator';

export class UpdateRoomTypeDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  price?: number;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  image?: any;
}
