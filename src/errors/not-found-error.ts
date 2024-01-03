import { STATUS_CODES } from 'http';

import { HTTP_CODES } from '../utils/types';

const { NOT_FOUND_404 } = HTTP_CODES;

export default class NotFoundError extends Error {
  statusCode = NOT_FOUND_404;

  constructor(message?: string) {
    super(message || STATUS_CODES[NOT_FOUND_404]);
    this.name = 'NotFoundError';
  }
}
