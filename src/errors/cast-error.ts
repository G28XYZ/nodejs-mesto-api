import { STATUS_CODES } from 'http';

import { HTTP_CODES } from '../utils/types';

const { BAD_REQUEST_400 } = HTTP_CODES;

export default class CastError extends Error {
  statusCode = BAD_REQUEST_400;

  constructor(message?: string) {
    super(message || STATUS_CODES[BAD_REQUEST_400]);
    this.name = 'CastError';
  }
}
