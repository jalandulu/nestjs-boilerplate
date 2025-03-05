import { Prisma } from '@prisma/client';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { IUpdateNotificationTokenDto } from 'src/cores/interfaces/dtos';

export class UpdateNotificationTokenDto implements IUpdateNotificationTokenDto, PrismaDto {
  userId?: IUpdateNotificationTokenDto['userId'];
  type?: IUpdateNotificationTokenDto['type'];
  token?: IUpdateNotificationTokenDto['token'];

  constructor(payload: IUpdateNotificationTokenDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.NotificationTokenUncheckedUpdateInput {
    return {
      userId: this.userId,
      type: this.type,
      token: this.token,
    };
  }
}
