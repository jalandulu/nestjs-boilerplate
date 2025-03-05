import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { IUpdateRoleDto } from 'src/cores/interfaces/dtos';

export class UpdateRoleDto implements IUpdateRoleDto, PrismaDto {
  name?: string;
  permissions?: number[];

  constructor(payload: IUpdateRoleDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.RoleUncheckedUpdateInput {
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
      create: this.permissions?.map((id) => ({
        permission: {
          connect: {
            id,
          },
        },
      })),
    };
  }
}
