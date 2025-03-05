import { Prisma } from '@prisma/client';
import { Hash } from 'src/common/helpers';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { IUpdateIdentityPasswordDto } from 'src/cores/interfaces/dtos';

export class SetIdentityPasswordDto
  implements Omit<IUpdateIdentityPasswordDto, 'currentPassword'>, PrismaDto
{
  password: string;

  constructor(payload: Omit<IUpdateIdentityPasswordDto, 'currentPassword'>) {
    Object.assign(this, payload);
  }

  async toPrisma(): Promise<Prisma.IdentityUncheckedUpdateInput> {
    return {
      password: await this.hashPassword,
    };
  }

  get hashPassword(): Promise<string> {
    return Hash.make(this.password);
  }
}
