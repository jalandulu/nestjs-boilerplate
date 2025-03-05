import { Prisma } from '@prisma/client';
import { Hash } from 'src/common/helpers';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { AccountStatus } from 'src/cores/enums';
import { ICreateIdentityDto } from 'src/cores/interfaces/dtos';

export class CreateIdentityDto implements ICreateIdentityDto, PrismaDto {
  userId: string;
  roleId: number;
  username: string;
  password: string;
  status?: AccountStatus;
  permissionIds?: number[];

  constructor(payload: ICreateIdentityDto) {
    Object.assign(this, payload);
  }

  async toPrisma(): Promise<Prisma.IdentityUncheckedCreateInput> {
    return {
      id: this.userId,
      roleId: this.roleId,
      username: this.username,
      password: await this.hashPassword,
      status: this.status || AccountStatus.Active,
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

  get hashPassword(): Promise<string> {
    return Hash.make(this.password);
  }
}
