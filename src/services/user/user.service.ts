import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Prisma } from '@prisma/client';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from 'src/cores/dtos';
import { proxyPrismaModel } from 'src/infrastructures/database';
import { UserMap, UsersMap } from 'src/cores/entities';

@Injectable()
export class UserService {
  constructor(private readonly dataService: TransactionHost<TransactionalAdapterPrisma>) {}

  async findAll({ toWhere, toOrder, perPage, page }: QueryUserDto) {
    const proxy = proxyPrismaModel<UsersMap>(this.dataService.tx.user);
    return await proxy
      .paginate({
        where: {
          ...toWhere,
          deletedAt: null,
        },
        include: {
          picture: true,
        },
        orderBy: toOrder ?? {
          createdAt: 'desc',
        },
      })
      .withPages({
        limit: perPage,
        page: page,
      });
  }

  async findOne<T extends UserMap>(id: string, include?: Prisma.UserInclude) {
    return (await this.dataService.tx.user.findFirst({
      where: { id, deletedAt: null },
      include,
    })) as unknown as T;
  }

  async create<T extends UserMap>(createUserDto: CreateUserDto, include?: Prisma.UserInclude) {
    return (await this.dataService.tx.user.create({
      data: createUserDto.toPrisma,
      include,
    })) as unknown as T;
  }

  async update<T extends UserMap>(
    id: string,
    updateUserDto: UpdateUserDto,
    include?: Prisma.UserInclude,
  ) {
    return (await this.dataService.tx.user.update({
      where: { id },
      data: updateUserDto.toPrisma,
      include,
    })) as unknown as T;
  }

  async remove(id: string) {
    const now = DateTime.now().toISO();

    const updatedUser = await this.dataService.tx.user.update({
      where: { id },
      data: { deletedAt: now },
      include: { identity: true },
    });

    if (updatedUser.identity) {
      await this.dataService.tx.identity.update({
        where: { id: id },
        data: { deletedAt: now },
      });
    }

    return updatedUser;
  }

  async removeForce(id: string) {
    const user = await this.dataService.tx.user.findUnique({
      where: { id },
      include: { identity: true },
    });

    if (!user) {
      throw new Error(`user with id: ${id} not found`);
    }

    if (user.identity) {
      await this.dataService.tx.permissionsOnIdentities.deleteMany({
        where: { identityId: id },
      });
      await this.dataService.tx.identity.delete({
        where: { id },
      });
    }

    return await this.dataService.tx.user.delete({
      where: { id },
    });
  }
}
