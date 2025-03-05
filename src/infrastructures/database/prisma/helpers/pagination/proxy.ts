import type { PaginationData, ProxyFunctions } from './types';
import { paginateWithPages } from './paginator';

/**
 * makeFindManyPaginated
 *
 * factory function that creates the findManyPaginated method.
 * this method is used to paginate the results of a findMany method.
 * this method implements js proxy to intercept the call to findMany and add the pagination logic.
 */
export function makeFindManyPaginated(model: ProxyFunctions) {
  return new Proxy(model.findMany, {
    apply: (target, thisArg, [data]) => {
      return {
        withPages: async (options: PaginationData = {}) => {
          return await paginateWithPages(model, target, thisArg, data, options);
        },
      };
    },
  });
}
