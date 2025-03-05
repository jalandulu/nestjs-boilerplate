export type Paginated<T> = {
  data: T[];
};

export type PaginatedMeta = {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  previousPage: number;
  nextPage: number;
  pageCount: number;
  totalCount: number;
};

/**
 * Pagination information
 */
export type PaginationData = {
  page?: number;
  limit?: number;
};

/**
 * Proxy functions
 *
 * used to create custom methods for prisma models
 */
export type ProxyFunctions = {
  findMany: (params: unknown, pagination: PaginationData) => Promise<any>;
  count: (params: unknown) => Promise<number>;
};

/**
 * Proxy returns
 *
 * used to create custom methods for prisma models
 */
export type ProxyReturns<F extends ProxyFunctions> = Awaited<ReturnType<F['findMany']>>[0][];

/**
 * ProxyPrismaModel
 *
 * type of a prisma model with custom methods. to date, only findManyPaginated is implemented
 */
export type ProxyPrismaModel<R extends ProxyReturns<F>, F extends ProxyFunctions> = F &
  FindManyPaginated<R, F>;

/**
 * FindManyPaginated
 *
 * type of the findManyPaginated method
 */
export type FindManyPaginated<R extends ProxyReturns<F>, F extends ProxyFunctions> = {
  paginate: (
    data?: Omit<Parameters<F['findMany']>[0], 'take' | 'skip'>,
    pagination?: PaginationData,
  ) => {
    withPages: (options?: PaginationData) => Promise<Promise<[R, PaginatedMeta]>>;
  };
};
