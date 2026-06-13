import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class change_passworddto {
  @ApiProperty({
    example: 'your old password',
  })
  @IsString()
  oldPwd: string;

  @ApiProperty({
    example: 'your new password',
  })
  @IsString()
  newPwd: string;

  @ApiProperty({
    example: 'your confirm password',
  })
  @IsString()
  confirmPwd: string;
}
