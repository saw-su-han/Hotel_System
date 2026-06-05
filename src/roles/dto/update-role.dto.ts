import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'Role name',
    example: 'moderator',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'List of permission IDs to add to the role',
    example: [5, 6, 7],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  addPermissionIds?: number[];

  @ApiPropertyOptional({
    description: 'List of permission IDs to remove from the role',
    example: [1, 2],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  removePermissionIds?: number[];
}
