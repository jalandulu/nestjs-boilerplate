import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class MetaRequest {
  @ApiProperty({
    type: String,
    description: 'The author',
  })
  @IsOptional()
  @IsString()
  public author?: string;

  @ApiProperty({
    type: String,
    description: 'The description of the content',
  })
  @IsOptional()
  @IsString()
  public description?: string;

  @ApiProperty({
    type: String,
    description: 'The keywords of the content',
  })
  @IsOptional()
  @IsString()
  public keywords?: string;
}
