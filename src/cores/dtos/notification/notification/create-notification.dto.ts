import { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';
import type { ICreateNotificationDto, NotificationData } from 'src/cores/interfaces/dtos';

export class CreateNotificationDto<T extends NotificationData>
  implements ICreateNotificationDto<T>, PrismaDto
{
  service: string;
  type: string;
  notifiableType: string;
  notifiableId: string;
  data: T;
  sentAt?: string;
  readAt?: string;

  constructor(payload: ICreateNotificationDto<T>) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.NotificationUncheckedCreateInput {
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
