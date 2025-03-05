import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateNotificationTokenDto, UpdateNotificationTokenDto } from 'src/cores/dtos';
import { NotificationTokenMap } from 'src/cores/entities';

@Injectable()
export class NotificationTokenService {
  constructor(private readonly dataService: TransactionHost<TransactionalAdapterPrisma>) {}

  async findAll() {
    return await this.dataService.tx.notificationToken.findMany();
  }

  async findOne<T extends NotificationTokenMap>(
    where?: Prisma.NotificationTokenWhereInput,
    include?: Prisma.NotificationTokenInclude,
  ) {
    return (await this.dataService.tx.notificationToken.findFirst({
      where,
      include,
    })) as unknown as T;
  }

  async create<T extends NotificationTokenMap>(
    notifiactionDto: CreateNotificationTokenDto,
    include?: Prisma.NotificationTokenInclude,
  ) {
    return (await this.dataService.tx.notificationToken.create({
      data: notifiactionDto.toPrisma,
      include,
    })) as unknown as T;
  }

  async upsert<T extends NotificationTokenMap>(
    notificationDto: CreateNotificationTokenDto,
    include?: Prisma.NotificationTokenInclude,
  ) {
    const exist = await this.findOne<
      Prisma.NotificationTokenGetPayload<Prisma.NotificationDefaultArgs>
    >({
      userId: notificationDto.userId,
      type: notificationDto.type,
    });

    if (exist) {
      return await this.update(
        exist.id,
        new UpdateNotificationTokenDto({
          userId: notificationDto.userId,
          type: notificationDto.type,
          token: notificationDto.token,
        }),
        include,
      );
    }

    return await this.create<T>(notificationDto, include);
  }

  async update<T extends NotificationTokenMap>(
    id: number,
    notifiactionDto: UpdateNotificationTokenDto,
    include?: Prisma.NotificationTokenInclude,
  ) {
    return (await this.dataService.tx.notificationToken.update({
      where: { id },
      data: notifiactionDto.toPrisma,
      include,
    })) as unknown as T;
  }

  async remove(id: number) {
    return await this.dataService.tx.notificationToken.delete({
      where: { id },
    });
  }

  async removeByUser(
    userId: string,
    where?: Omit<Prisma.NotificationTokenWhereInput, 'userId' | 'user'>,
  ) {
    return await this.dataService.tx.notificationToken.deleteMany({
      where: { userId, ...where },
    });
  }
}
