import type { Prisma } from '@prisma/client';
import type { IQueryable } from 'src/cores/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { QueryWhereRequest } from './query-where.request';
import { Query } from 'src/common/helpers';
import { QueryOrderRequest } from './query-order.request';
import { QueryMode } from 'src/cores/consts';
import { PaginationRequest } from '../pagination.request';
import { IsQueryableColumn } from 'src/middlewares/validators';

export class QueryRequest<Model extends Prisma.ModelName> extends PaginationRequest {
  constructor(
    public model: Model,
    public queryable: IQueryable<Model>[],
  ) {
    super();
  }

  @ApiProperty({
    type: String,
    description: 'Query mode',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(QueryMode)
  public mode: string = 'AND';

  @ApiProperty({
    type: String,
    description: 'Query search',
    required: false,
  })
  @IsOptional()
  @IsString()
  public q?: string;

  @ApiProperty({
    type: [QueryWhereRequest],
    description: 'Column of model',
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @IsQueryableColumn('column', { each: true, targetValue: 'value', targetOperator: 'operator' })
  @Transform(({ value, obj }: { value: string[] | undefined; obj: QueryRequest<Model> }) => {
    if (!Array.isArray(value)) return undefined;

    return value?.map((v) => {
      const parsed = Query.parseWhere(Query.transformValue(v, obj.q));
      return plainToInstance(QueryWhereRequest, {
        ...parsed,
        value: parsed.value,
      });
    });
  })
  @Type(() => QueryWhereRequest)
  public where?: QueryWhereRequest[];

  @ApiProperty({
    type: [QueryOrderRequest],
    description: 'Column of model',
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @IsQueryableColumn('column', { each: true })
  @Transform(({ value }: { value: string[] }) => {
    if (!Array.isArray(value)) return undefined;

    return value.map((v) => plainToInstance(QueryOrderRequest, Query.parseOrder(v)));
  })
  @Type(() => QueryOrderRequest)
  public order?: QueryOrderRequest[];
}
