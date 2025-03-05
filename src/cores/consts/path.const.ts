import { Storage } from 'src/common/helpers';
import { StorageCode } from '../enums';

export const paths = [
  {
    code: StorageCode.ProfilePicture,
    path: '/users/pictures' as Storage.DirpathType,
  },
  {
    code: StorageCode.CmsPicture,
    path: '/cms/pictures' as Storage.DirpathType,
  },
] as const;
