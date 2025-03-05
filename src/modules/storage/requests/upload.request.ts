import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StorageCode } from 'src/cores/enums';

export class UploadRequest {
  @ApiProperty({
    description: 'The file code',
    enum: StorageCode,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(StorageCode)
  public code: StorageCode;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: S3.MultipartFile;
}

export class MultipleUploadRequest {
  @ApiProperty({
    description: 'The file code',
    enum: StorageCode,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(StorageCode)
  public code!: StorageCode;

  @ApiProperty({ type: [String], format: 'binary', required: true })
  files: S3.MultipartFile[];
}
