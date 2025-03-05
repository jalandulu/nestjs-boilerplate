import { Prisma } from '@prisma/client';

export type NotificationTokenMap =
  Prisma.NotificationTokenGetPayload<Prisma.NotificationTokenDefaultArgs>;

export type NotificationTokensMap = NotificationTokenMap[];

export type NotificationTokenEntity = {
  type: string;
  token: string;
};
