import { Prisma } from '@prisma/client';
import { Generate } from 'src/common/helpers';
import { PrismaDto } from 'src/cores/contracts/dtos';
import { NotificationTokenType } from 'src/cores/enums';
import { ICreateNotificationTokenDto } from 'src/cores/interfaces/dtos';

export class CreateNotificationTokenDto implements ICreateNotificationTokenDto, PrismaDto {
  userId: string;
  type: NotificationTokenType;
  token: string;

  constructor(
    payload: Omit<ICreateNotificationTokenDto, 'token'> & {
      token?: string;
    },
  ) {
    Object.assign(this, {
      ...payload,
      token: payload.token ? payload.token : Generate.notificationToken(),
    });
  }

  get toPrisma(): Prisma.NotificationTokenUncheckedCreateInput {
    return {
      userId: this.userId,
      type: this.type,
      token: this.token,
    };
  }
}
