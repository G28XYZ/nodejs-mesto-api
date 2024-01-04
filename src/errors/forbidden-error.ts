import { STATUS_CODES } from 'http';

import { HTTP_CODES } from '../utils/types';

const { FORBIDDEN_403 } = HTTP_CODES;

export default class ForbiddenError extends Error {
  statusCode = FORBIDDEN_403;

  constructor(message?: string) {
    super(message || STATUS_CODES[FORBIDDEN_403]);
    this.name = 'ForbiddenError';
  }
}
