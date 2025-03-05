import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUsernameRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;
}
