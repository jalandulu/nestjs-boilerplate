import { AccountStatus } from 'src/cores/enums';

export interface ICreateIdentityDto {
  userId: string;
  roleId: number;
  username: string;
  password: string;
  status?: AccountStatus;
  permissionIds?: number[];
}
