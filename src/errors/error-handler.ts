import { STATUS_CODES } from 'http';

import { HTTP_CODES, TErrorHandler } from '../utils/types';

const handleError: TErrorHandler = (err, _, res) => {
  const statusCode = err.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR_500;
  const message = STATUS_CODES[statusCode] || err.message;
  res.status(statusCode).send({ message });
};

export default handleError;
