import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DateTime } from 'luxon';
import { Hash } from 'src/common/helpers';
import {
  CreateIdentityDto,
  PaginationDto,
  UpdateIdentityPasswordDto,
  UpdateIdentityProfileDto,
  UpdateIdentityDto,
  SetIdentityPasswordDto,
  SetIdentityPermissionDto,
  SetIdentityUsernameDto,
  SetIdentityRoleDto,
} from 'src/cores/dtos';
import { SetIdentityStatusDto } from 'src/cores/dtos/auth/identity/set-identity-status.dto';
import { AccountDefaultMap, AccountsMap } from 'src/cores/entities';
import { proxyPrismaModel } from 'src/infrastructures/database';

@Injectable()
export class IdentityService {
  constructor(private readonly dataService: TransactionHost<TransactionalAdapterPrisma>) {}

  async findAll({
    page,
    perPage,
    currentUserId,
  }: {
    q?: string;
    currentUserId?: string;
  } & PaginationDto) {
    const proxy = proxyPrismaModel<AccountsMap>(this.dataService.tx.identity);
    return await proxy
      .paginate({
        where: {
          id: {
            not: currentUserId,
          },
          roleId: {
            not: 1,
          },
          deletedAt: null,
        },
        include: {
          user: {
            include: {
              picture: true,
            },
          },
          role: true,
        },
      })
      .withPages({
        limit: perPage,
        page: page,
      });
  }

  async findOne<T extends AccountDefaultMap>(id: string, include?: Prisma.IdentityInclude) {
    return (await this.dataService.tx.identity.findFirst({
      where: { id, deletedAt: null },
      include: include,
    })) as unknown as T;
  }

  async findUsername(
    username: string,
    exclude?: {
      column: string;
      value: any;
    },
  ) {
    return await this.dataService.tx.identity.findFirst({
      where: {
        username,
        deletedAt: null,
        [exclude.column]: {
          not: exclude.value,
        },
      },
    });
  }

  async isVerified(id: string) {
    const isVerified = await this.dataService.tx.identity.findFirst({
      where: {
        id,
        verifiedAt: null,
        deletedAt: null,
      },
      select: {
        verifiedAt: true,
      },
    });

    if (!isVerified) return true;

    return !!isVerified.verifiedAt;
  }

  async isActive(id: string) {
    const isVerified = await this.dataService.tx.identity.findFirst({
      where: {
        id,
        disabledAt: null,
        deletedAt: null,
      },
      select: {
        disabledAt: true,
      },
    });

    return !!isVerified;
  }

  async create<T extends AccountDefaultMap>(
    createIdentityDto: CreateIdentityDto,
    include?: Prisma.IdentityInclude,
  ) {
    return (await this.dataService.tx.identity.create({
      data: await createIdentityDto.toPrisma(),
      include,
    })) as unknown as T;
  }

  async update<T extends AccountDefaultMap>(
    id: string,
    updateIdentityDto: UpdateIdentityDto,
    include?: Prisma.IdentityInclude,
  ) {
    await this.removePermissions(id);

    return (await this.dataService.tx.identity.update({
      where: {
        id,
      },
      data: await updateIdentityDto.toPrisma(),
      include,
    })) as unknown as T;
  }

  async upsert<T extends AccountDefaultMap>(
    identityDto: CreateIdentityDto,
    include?: Prisma.IdentityInclude,
  ) {
    try {
      return await this.create<T>(identityDto, include);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return await this.update<T>(identityDto.userId, identityDto, include);
        }
      }

      throw error;
    }
  }

  async updateProfile(id: string, profileDto: UpdateIdentityProfileDto) {
    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        user: {
          update: {
            data: {
              name: profileDto.name,
            },
          },
        },
      },
    });
  }

  async updateUsername(id: string, { username }: SetIdentityUsernameDto) {
    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        username,
        user: {
          update: {
            data: {
              email: username,
            },
          },
        },
      },
    });
  }

  async updateRole(id: string, { roleId }: SetIdentityRoleDto) {
    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        roleId,
      },
    });
  }

  async updatePermission(id: string, { toPrisma }: SetIdentityPermissionDto) {
    await this.dataService.tx.permissionsOnIdentities.deleteMany({
      where: {
        identityId: id,
      },
    });

    return await this.dataService.tx.identity.update({
      where: { id },
      data: toPrisma,
    });
  }

  async changePassword(id: string, { currentPassword, password }: UpdateIdentityPasswordDto) {
    const exist = await this.dataService.tx.identity.findFirst({
      where: {
        id: id,
      },
    });

    if (!exist) {
      throw new NotFoundException(`account doesn't exist`);
    }

    if (!(await Hash.verify(currentPassword, exist.password))) {
      throw new BadRequestException([
        {
          field: 'currentPassword',
          errors: [`current password doesn't match.`],
        },
      ]);
    }

    return await this.updatePassword(id, new SetIdentityPasswordDto({ password }));
  }

  async updatePassword(id: string, { hashPassword }: SetIdentityPasswordDto) {
    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        password: await hashPassword,
      },
    });
  }

  async updateStatus(id: string, { status, disabledAt }: SetIdentityStatusDto) {
    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        status,
        disabledAt,
      },
    });
  }

  async updateVerified(id: string, verifiedAt?: string) {
    const emailVerifiedAt = verifiedAt || DateTime.now().toISO();

    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        verifiedAt: emailVerifiedAt,
        user: {
          update: {
            data: {
              emailVerifiedAt: emailVerifiedAt,
            },
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.dataService.tx.identity.update({
      where: { id },
      data: {
        disabledAt: DateTime.now().toISO(),
        deletedAt: DateTime.now().toISO(),
      },
    });
  }

  async removeForce(id: string) {
    return await this.dataService.tx.identity.delete({
      where: { id },
    });
  }

  async removePermissions(id: string) {
    return await this.dataService.tx.permissionsOnIdentities.deleteMany({
      where: { identityId: id },
    });
  }
}
