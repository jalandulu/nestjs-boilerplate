import { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { IUpdateNotificationDto } from 'src/cores/interfaces/dtos';

export class UpdateNotificationDto<T extends { [key: string]: any }>
  implements IUpdateNotificationDto<T>, PrismaDto
{
  service?: string;
  type?: string;
  notifiableType?: string;
  notifiableId?: string;
  data?: T;
  sentAt?: string;
  readAt?: string;

  constructor(payload: IUpdateNotificationDto<T>) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.NotificationUncheckedUpdateInput {
    return {
      service: this.service,
      type: this.type,
      notifiableType: this.notifiableType,
      notifiableId: this.notifiableId,
      data: this.data,
      sentAt: this.sentAt,
      readAt: this.readAt,
    };
  }
}
