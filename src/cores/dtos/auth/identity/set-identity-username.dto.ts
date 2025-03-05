import { Prisma } from '@prisma/client';
import { ICreateIdentityDto } from 'src/cores/interfaces/dtos';

export class SetIdentityUsernameDto implements Pick<ICreateIdentityDto, 'username'> {
  username: string;

  constructor(payload: Pick<ICreateIdentityDto, 'username'>) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.IdentityUncheckedUpdateInput {
    return {
      username: this.username,
    };
  }
}
