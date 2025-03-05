import type { ICreateIdentityDto } from 'src/cores/interfaces/dtos';
import type { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';

export class SetIdentityPermissionDto
  implements Pick<ICreateIdentityDto, 'permissionIds'>, PrismaDto
{
  permissionIds: number[];

  constructor(payload: Pick<ICreateIdentityDto, 'permissionIds'>) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.IdentityUncheckedUpdateInput {
    return {
      permissionsOnIdentities: this.permissionsToPrisma,
    };
  }

  get permissionsToPrisma(): Prisma.PermissionsOnIdentitiesUncheckedUpdateManyWithoutIdentityNestedInput {
    return {
      create: this.permissionIds.map((id) => ({
        permissionId: id,
      })),
    };
  }
}
