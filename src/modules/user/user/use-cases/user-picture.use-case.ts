import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/services/storage';
import { UserService } from 'src/services';
import { StorageCode } from 'src/cores/enums';
import { UpdateUserDto } from 'src/cores/dtos';

@Injectable()
export class UserPictureUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  async updatePicture(userId: string, file: S3.MultipartFile) {
    const uploaded = await this.storageService.upload({
      code: StorageCode.ProfilePicture,
      file: file,
    });

    await this.userService.update(
      userId,
      new UpdateUserDto({
        pictureId: uploaded.id,
      }),
    );

    return uploaded;
  }
}
