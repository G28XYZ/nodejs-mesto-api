import { Joi } from 'celebrate';
import isURL from 'validator/lib/isURL';

export default function validationURL(message: string) {
  return (value: string, helpers: Joi.CustomHelpers) => {
    if (isURL(value)) return value;
    return helpers.message({ custom: message });
  };
}
