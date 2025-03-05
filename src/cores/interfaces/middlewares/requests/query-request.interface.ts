import type { ModelKeys } from 'src/cores/globals';
import type { IQueryWhereRequest } from './query-where.interface';
import type { IQueryOrderRequest } from './query-order.interface';
import type { Prisma } from '@prisma/client';

export type IQueryableColumnType = 'uuid' | 'int' | 'number' | 'string' | 'boolean' | 'datetime';
export type IQueryableAccessable = 'search' | 'single';
export type IQueryableMode = string | 'OR' | 'AND' | 'NOT';

export interface IQueryable<Model extends Prisma.ModelName> {
  key: {
    [key: string]: ModelKeys<Model>;
  };
  type: IQueryableColumnType;
  accessables: IQueryableAccessable[];
}

export interface IQueryRequest<Model extends Prisma.ModelName> {
  model: string;
  queryable: IQueryable<Model>[];
  mode: IQueryableMode;
  q?: string;
  where?: IQueryWhereRequest[];
  order?: IQueryOrderRequest[];
}
