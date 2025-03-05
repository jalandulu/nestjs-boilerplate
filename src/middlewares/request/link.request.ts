import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { UriMethod } from 'src/cores/enums';

export class LinkRequest {
  @ApiProperty({
    type: String,
    description: 'The url method',
  })
  @IsOptional()
  @IsEnum(UriMethod)
  @Transform(({ value }) => value || UriMethod.Get)
  public method: UriMethod;

  @ApiProperty({
    type: String,
    description: 'The url',
  })
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'], require_tld: false })
  public url: string;
}
