import { STATUS_CODES } from 'http';

import { HTTP_CODES, TErrorHandler } from '../utils/types';

const { INTERNAL_SERVER_ERROR_500 } = HTTP_CODES;

const handleError: TErrorHandler = (err, _, res, next) => {
  if (typeof err === 'string') {
    res.status(INTERNAL_SERVER_ERROR_500).send({ message: err });
  } else {
    const statusCode = err.statusCode || INTERNAL_SERVER_ERROR_500;
    const message = err.message || STATUS_CODES[statusCode];
    res.status(statusCode).send({ message });
  }
  return next();
};

export default handleError;
