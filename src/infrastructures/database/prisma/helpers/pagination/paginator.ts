import { PaginationData, ProxyFunctions } from './types';

export const paginateWithPages = async (
  model: ProxyFunctions,
  target: (params: unknown, pagination: PaginationData) => Promise<any>,
  thisArg: any,
  data: any,
  options: PaginationData = {},
) => {
  const page = options?.page || 1;
  const limit = options?.limit || options?.limit === 0 ? options?.limit : 10;
  const query = data;

  const previousPage = page > 1 ? page - 1 : null;

  const [results, totalCount] = await Promise.all([
    target.apply(thisArg, [
      {
        ...query,
        ...{
          skip: (page - 1) * (limit ?? 0),
          take: limit === null ? undefined : limit,
        },
      },
    ]),
    model.count({
      ...query,
      ...{
        select: undefined,
        include: undefined,
        omit: undefined,
      },
      ...{
        orderBy: undefined,
      },
    }),
  ]);

  const pageCount = limit === null ? 1 : Math.ceil(totalCount / limit);
  const nextPage = page < pageCount ? page + 1 : null;

  return [
    results,
    {
      isFirstPage: previousPage === null,
      isLastPage: nextPage === null,
      currentPage: page,
      previousPage,
      nextPage,
      pageCount,
      totalCount,
    },
  ];
};
