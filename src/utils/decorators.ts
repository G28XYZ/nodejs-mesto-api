import { STATUS_CODES } from 'http';
import {
  HTTP_CODES,
  TController,
  TControllerParameters,
  TDecoratorMethod,
} from './types';

const { INTERNAL_SERVER_ERROR_500 } = HTTP_CODES;
/** декоратор для перехвата ошибок в контроллерах */
export function catchError(errorMessage?: string): TDecoratorMethod {
  return (_, __, descriptor) => {
    const originalMethod = descriptor.value;
    async function fn(
      this: new () => TController,
      ...args: TControllerParameters
    ) {
      const [_req, res] = args;
      let result;
      try {
        result = await originalMethod.apply(this, args);
      } catch (e: any) {
        const message = e.message || STATUS_CODES[INTERNAL_SERVER_ERROR_500];
        res?.status(INTERNAL_SERVER_ERROR_500)?.send({
          message: errorMessage || message,
        });
      }
      return result;
    }
    // eslint-disable-next-line no-param-reassign
    descriptor.value = fn;
    return descriptor;
  };
}

export const a = {};
