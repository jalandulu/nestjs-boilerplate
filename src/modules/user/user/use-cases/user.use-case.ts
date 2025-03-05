import { Injectable } from '@nestjs/common';
import { CreateUserRequest, QueryUserRequest, UpdateUserRequest } from '../requests';
import { UserService } from 'src/services';
import { Transactional } from '@nestjs-cls/transactional';
import { ProfileEntity, UserMap } from 'src/cores/entities';
import { UserType } from 'src/cores/enums';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from 'src/cores/dtos';

@Injectable()
export class UserUseCase {
  constructor(private readonly userService: UserService) {}

  async findAll(query: QueryUserRequest, profile: ProfileEntity) {
    return await this.userService.findAll(new QueryUserDto(profile.id, query));
  }

  async findOne(userId: string) {
    return await this.userService.findOne<UserMap>(userId, {
      picture: true,
    });
  }

  @Transactional()
  async create(payload: CreateUserRequest) {
    return await this.userService.create<UserMap>(
      new CreateUserDto({
        type: UserType.Operator,
        name: payload.name,
        email: payload.email,
        pictureId: payload.pictureId,
      }),
      {
        picture: true,
      },
    );
  }

  @Transactional()
  async update(userId: string, payload: UpdateUserRequest) {
    return await this.userService.update(
      userId,
      new UpdateUserDto({
        name: payload.name,
        email: payload.email,
      }),
      {
        picture: true,
      },
    );
  }

  @Transactional()
  async remove(userId: string) {
    return await this.userService.removeForce(userId);
  }
}
