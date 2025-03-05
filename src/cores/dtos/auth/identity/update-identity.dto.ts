import { Prisma } from '@prisma/client';
import { Hash } from 'src/common/helpers';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { AccountStatus } from 'src/cores/enums';
import { IUpdateIdentityDto } from 'src/cores/interfaces/dtos';

export class UpdateIdentityDto implements IUpdateIdentityDto, PrismaDto {
  roleId?: number;
  username?: string;
  password?: string;
  status?: AccountStatus;
  permissionIds?: number[];

  constructor(payload: IUpdateIdentityDto) {
    Object.assign(this, payload);
  }

  async toPrisma(): Promise<Prisma.IdentityUncheckedCreateInput> {
    return {
      roleId: this.roleId,
      username: this.username,
      password: await this.hashPassword,
      status: this.status || AccountStatus.Active,
      disabledAt: null,
      deletedAt: null,
      permissionsOnIdentities: this.permissionsToPrisma,
    };
  }

  get permissionsToPrisma():
    | Prisma.PermissionsOnIdentitiesUncheckedCreateNestedManyWithoutIdentityInput
    | undefined {
    if (!this.permissionIds) return undefined;

    return {
      create: this.permissionIds?.map((id) => ({
        permissionId: id,
      })),
    };
  }

  get hashPassword(): Promise<string> | undefined {
    if (!this.password) return undefined;
    return Hash.make(this.password);
  }
}
