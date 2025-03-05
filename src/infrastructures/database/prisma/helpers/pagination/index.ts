import type { ProxyFunctions, ProxyPrismaModel, ProxyReturns } from './types';
import { makeFindManyPaginated } from './proxy';

/**
 * ProxyPrismaModel
 *
 * the factory function that creates a ProxyPrismaModel. to date, only findManyPaginated is implemented.
 */
export function proxyPrismaModel<
  R extends ProxyReturns<F>,
  F extends ProxyFunctions = ProxyFunctions,
>(model: F): ProxyPrismaModel<R, F> {
  Reflect.set(model, 'paginate', makeFindManyPaginated(model));

  return model as ProxyPrismaModel<R, F>;
}
