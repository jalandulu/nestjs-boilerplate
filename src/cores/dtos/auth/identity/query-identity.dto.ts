import type { IQueryable, IQueryRequest } from 'src/cores/interfaces';
import { QueryableDto } from '../../queryable.dto';

export const QueryableIdentity: IQueryable<'Identity'>[] = [
  { key: { username: 'username' }, type: 'string', accessables: ['single', 'search'] },
  { key: { status: 'status' }, type: 'string', accessables: ['single'] },
  { key: { createdAt: 'createdAt' }, type: 'datetime', accessables: ['single'] },
];

export class QueryIdentityDto extends QueryableDto<'Identity'> {
  constructor(
    public readonly currentUserId: string,
    query: IQueryRequest<'Identity'>,
  ) {
    super(query);
  }
}
