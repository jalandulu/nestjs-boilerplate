import type { PrismaDto } from 'src/cores/contracts/dtos';
import type { ICreateRoleDto } from 'src/cores/interfaces/dtos';
import { Prisma } from '@prisma/client';
import _ from 'lodash';

export class CreateRoleDto implements ICreateRoleDto, PrismaDto {
  name: string;
  permissions: number[];

  constructor(payload: ICreateRoleDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.RoleUncheckedCreateInput {
    return {
      name: this.name,
      slug: this.slug,
      permissionsOnRoles: this.permissionsToPrisma,
    };
  }

  get slug() {
    if (!this.name) return undefined;

    return _.kebabCase(this.name);
  }

  get permissionsToPrisma(): Prisma.PermissionsOnRolesUncheckedCreateNestedManyWithoutRoleInput {
    return {
      create: this.permissions.map((id) => ({
        permission: {
          connect: {
            id,
          },
        },
      })),
    };
  }
}
