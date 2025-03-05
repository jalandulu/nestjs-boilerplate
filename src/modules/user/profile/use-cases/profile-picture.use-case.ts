import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/services/storage';
import { AuthService, UserService } from 'src/services';
import { ProfileEntity } from 'src/cores/entities';
import { StorageCode } from 'src/cores/enums';
import { FileMapper } from 'src/middlewares/interceptors';
import { UpdateUserDto } from 'src/cores/dtos';

@Injectable()
export class ProfilePictureUseCase {
  constructor(
    private readonly fileMapper: FileMapper,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly storageService: StorageService,
  ) {}

  async updatePicture(profile: ProfileEntity, file: S3.MultipartFile) {
    const uploaded = await this.storageService.upload({
      code: StorageCode.ProfilePicture,
      file: file,
    });

    await this.userService.update(
      profile.id,
      new UpdateUserDto({
        pictureId: uploaded.id,
      }),
    );

    const mapped = await this.fileMapper.toMap(uploaded);

    await this.authService.setUser(profile.id, { ...profile, picture: mapped });

    return mapped;
  }
}
