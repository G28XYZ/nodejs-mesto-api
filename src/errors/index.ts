import NotFoundError from './not-found-error';
import ValidationError from './validation-error';
import CastError from './cast-error';
import ForbiddenError from './forbidden-error';

export default {
  NotFoundError,
  ValidationError,
  CastError,
  ForbiddenError,
} as Record<string, new <T extends Error>(message?: string) => T>;
