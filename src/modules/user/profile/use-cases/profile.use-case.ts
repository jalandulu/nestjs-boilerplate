import { Injectable } from '@nestjs/common';
import { ProfileEntity } from 'src/cores/entities';
import { UpdateProfileRequest } from '../requests';
import { AuthService, UserService } from 'src/services';
import { Transactional } from '@nestjs-cls/transactional';
import { UpdateUserDto } from 'src/cores/dtos';

@Injectable()
export class ProfileUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Transactional()
  async update(profile: ProfileEntity, payload: UpdateProfileRequest) {
    const updated = await this.userService.update(
      profile.id,
      new UpdateUserDto({
        name: payload.name,
      }),
    );

    await this.authService.setUser(profile.id, { ...profile, name: payload.name });

    return updated;
  }

  @Transactional()
  async destroy(profile: ProfileEntity) {
    return await this.userService.remove(profile.id);
  }
}
