import { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { ICreateUserDto } from 'src/cores/interfaces/dtos';

export class CreateUserDto implements ICreateUserDto, PrismaDto {
  type: string;
  name: string;
  email?: string;
  pictureId?: number;

  constructor(payload: ICreateUserDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.UserUncheckedCreateInput {
    return {
      type: this.type,
      name: this.name,
      email: this.email,
      pictureId: this.pictureId,
    };
  }
}
