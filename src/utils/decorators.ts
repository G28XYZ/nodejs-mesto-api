import { STATUS_CODES } from 'http';

import errors from '../errors';
import {
  HTTP_CODES,
  TController,
  TControllerParameters,
  TDecoratorMethod,
} from './types';
import NotFoundError from '../errors/not-found-error';

const { INTERNAL_SERVER_ERROR_500 } = HTTP_CODES;
/** декоратор для перехвата ошибок в контроллерах */
export default function catchError<T extends Error>(
  error?: string | T,
): TDecoratorMethod {
  return (_, __, descriptor) => {
    const originalMethod = descriptor.value;
    async function fn(
      this: new () => TController,
      ...args: TControllerParameters
    ) {
      const [_req, _res, next] = args;
      let result;
      try {
        result = await originalMethod.apply(this, args);
      } catch (e: any) {
        if (typeof error === 'object') return next(error);

        if (e?.name in errors) return next(new errors[e.name as string](error));

        if (error) return next(error);

        const message = e?.message || STATUS_CODES[INTERNAL_SERVER_ERROR_500];
        return next(new NotFoundError(message));
      }
      return result;
    }
    // eslint-disable-next-line no-param-reassign
    descriptor.value = fn;
    return descriptor;
  };
}
