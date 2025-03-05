import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { CreateRoleDto, UpdateRoleDto } from 'src/cores/dtos';
import { RoleMap } from 'src/cores/entities';

@Injectable()
export class RoleService {
  constructor(private readonly dataService: TransactionHost<TransactionalAdapterPrisma>) {}

  async findAll({ name }: { name?: string }) {
    return await this.dataService.tx.role.findMany({
      where: {
        name: {
          contains: name,
        },
        visible: true,
        deletedAt: null,
      },
    });
  }

  async findOne<T extends RoleMap>(id: number, include?: Prisma.RoleInclude) {
    return (await this.dataService.tx.role.findFirst({
      where: { id, visible: true, deletedAt: null },
      include,
    })) as unknown as T;
  }

  async findBySlug<T extends RoleMap>(slug: string, include?: Prisma.RoleInclude) {
    return (await this.dataService.tx.role.findFirst({
      where: { slug, visible: true, deletedAt: null },
      include,
    })) as unknown as T;
  }

  async create<T extends RoleMap>(createRoleDto: CreateRoleDto, include?: Prisma.RoleInclude) {
    return (await this.dataService.tx.role.create({
      data: createRoleDto.toPrisma,
      include,
    })) as unknown as T;
  }

  async update<T extends RoleMap>(
    id: number,
    updateRoleDto: UpdateRoleDto,
    include?: Prisma.RoleInclude,
  ) {
    await this.dataService.tx.permissionsOnRoles.deleteMany({
      where: {
        roleId: id,
      },
    });

    return (await this.dataService.tx.role.update({
      where: { id },
      data: updateRoleDto.toPrisma,
      include,
    })) as unknown as T;
  }

  async remove(id: number) {
    return await this.dataService.tx.role.update({
      where: { id },
      data: {
        deletedAt: DateTime.now().toISO(),
      },
    });
  }
}
