import type { NotificationData } from 'src/cores/interfaces';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import {
  PaginationDto,
  NotifiableNotificationDto,
  CreateNotificationDto,
  UpdateNotificationDto,
} from 'src/cores/dtos';
import { proxyPrismaModel } from 'src/infrastructures/database';
import { NotificationMap } from 'src/cores/entities';

@Injectable()
export class NotificationService {
  constructor(private readonly dataService: TransactionHost<TransactionalAdapterPrisma>) {}

  async statistic(params?: NotifiableNotificationDto) {
    let where: Prisma.NotificationWhereInput | undefined = undefined;
    if (params) {
      where = {
        notifiableId: params.notifiableId,
        notifiableType: params.notifiableType,
      };
    }

    return await this.dataService.tx.notification.aggregate({
      where,
      _count: {
        id: true,
        readAt: true,
      },
    });
  }

  async findAll(pagination: PaginationDto) {
    const proxy = proxyPrismaModel(this.dataService.tx.notification);
    return await proxy.paginate({ orderBy: { createdAt: 'desc' } }).withPages({
      limit: pagination.perPage,
      page: pagination.page,
    });
  }

  async findByNotifiable({
    notifiableType,
    notifiableId,
    page,
    perPage,
  }: NotifiableNotificationDto & PaginationDto) {
    const proxy = proxyPrismaModel(this.dataService.tx.notification);
    return await proxy
      .paginate({
        where: {
          notifiableType,
          notifiableId,
        },
        orderBy: { createdAt: 'desc' },
      })
      .withPages({
        limit: perPage,
        page: page,
      });
  }

  async findOne<T>(id: number) {
    return (await this.dataService.tx.notification.findFirst({
      where: { id },
    })) as T;
  }

  async create<T extends NotificationMap, U extends NotificationData = NotificationData>(
    notificationDto: CreateNotificationDto<U>,
  ) {
    return (await this.dataService.tx.notification.create({
      data: notificationDto.toPrisma,
    })) as T;
  }

  async createMany<T extends NotificationMap, U extends NotificationData = NotificationData>(
    notificationDto: CreateNotificationDto<U>[],
  ) {
    return (await this.dataService.tx.notification.createMany({
      data: notificationDto.map(({ toPrisma }) => toPrisma),
    })) as unknown as T;
  }

  async update<T extends NotificationMap, U extends NotificationData = NotificationData>(
    id: number,
    notificationDto: UpdateNotificationDto<U>,
  ) {
    return (await this.dataService.tx.notification.update({
      where: { id },
      data: notificationDto.toPrisma,
    })) as T;
  }

  async sent(id: number) {
    return await this.dataService.tx.notification.update({
      where: { id },
      data: {
        sentAt: DateTime.now().toISO(),
      },
    });
  }

  async read(id: number) {
    return await this.dataService.tx.notification.update({
      where: { id },
      data: {
        readAt: DateTime.now().toISO(),
      },
    });
  }

  async readByNotifiable({ notifiableType, notifiableId }: NotifiableNotificationDto) {
    return await this.dataService.tx.notification.updateMany({
      where: { notifiableId, notifiableType },
      data: {
        readAt: DateTime.now().toISO(),
      },
    });
  }

  async remove(id: number) {
    return await this.dataService.tx.notification.update({
      where: { id },
      data: { deletedAt: DateTime.now().toISO() },
    });
  }

  async removeByNotifiable({ notifiableType, notifiableId }: NotifiableNotificationDto) {
    return await this.dataService.tx.notification.updateMany({
      where: { notifiableType, notifiableId },
      data: {
        deletedAt: DateTime.now().toISO(),
      },
    });
  }

  async removeForce(id: number) {
    return await this.dataService.tx.notification.delete({
      where: { id },
    });
  }

  async removeForceByNotifiable({ notifiableType, notifiableId }: NotifiableNotificationDto) {
    return await this.dataService.tx.notification.deleteMany({
      where: { notifiableType, notifiableId },
    });
  }
}
