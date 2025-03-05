import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { AccountStatus } from 'src/cores/enums';
import { IUpdateIdentityStatusDto } from 'src/cores/interfaces/dtos';

export class SetIdentityStatusDto implements IUpdateIdentityStatusDto {
  enable: boolean;

  constructor(payload: IUpdateIdentityStatusDto) {
    Object.assign(this, payload);
  }

  get toPrisma(): Prisma.IdentityUncheckedUpdateInput {
    return {
      status: this.status,
    };
  }

  get status(): AccountStatus {
    return this.enable ? AccountStatus.Active : AccountStatus.Inactive;
  }

  get disabledAt(): string | null {
    return this.enable ? null : DateTime.now().toISO();
  }
}
