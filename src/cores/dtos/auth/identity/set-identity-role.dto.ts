import { Prisma } from '@prisma/client';
import { ICreateIdentityDto } from 'src/cores/interfaces/dtos';

export class SetIdentityRoleDto implements Pick<ICreateIdentityDto, 'roleId'> {
  roleId: number;

  constructor(payload: Pick<ICreateIdentityDto, 'roleId'>) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.IdentityUncheckedUpdateInput {
    return {
      roleId: this.roleId,
    };
  }
}
