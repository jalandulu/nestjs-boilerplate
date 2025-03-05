import { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { IUpdateUserDto } from 'src/cores/interfaces/dtos';

export class UpdateUserDto implements IUpdateUserDto, PrismaDto {
  name?: string;
  email?: string;
  pictureId?: number;

  constructor(payload: IUpdateUserDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.UserUncheckedUpdateInput {
    return {
      name: this.name,
      email: this.email,
      pictureId: this.pictureId,
      identity: {
        update: {
          data: {
            username: this.email,
          },
        },
      },
    };
  }
}
