import mongoose from 'mongoose';
import { Joi } from 'celebrate';

import { ERROR_MESSAGES, IUser, TModelSettings } from '../utils/types';
import validationURL from '../utils/validation-url';

/**
 * модель настроек для пользователя с схемами модели данных и ее валидации
 */
// prettier-ignore
class UserModelSettings<T extends IUser> implements TModelSettings<T> {
  nameModel = 'user';

  validationSchema = {
    /** схема для валидации при создании пользователя */
    create: {
      name: Joi.string()
        .min(2)
        .rule({ message: ERROR_MESSAGES.USERNAME })
        .max(30)
        .rule({ message: ERROR_MESSAGES.USERNAME })
        .required(),
      about: Joi.string()
        .min(2)
        .rule({ message: ERROR_MESSAGES.ABOUT })
        .max(30)
        .rule({ message: ERROR_MESSAGES.ABOUT })
        .required(),
      avatar: Joi.string()
        .required()
        // uri некорректно валидирует ссылку, поэтому вместо нее custom с методом из validator
        .custom(validationURL(ERROR_MESSAGES.AVATAR)),
    },
  };

  schema = new mongoose.Schema<T>(
    {
      name: {
        type: String,
        minLength: 2,
        maxLength: 30,
        required: true,
      },
      about: {
        type: String,
        minLength: 2,
        maxLength: 30,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    // убирает поле __v
    { versionKey: false },
  );

  get model() {
    return mongoose.model<T>(this.nameModel, this.schema);
  }
}

export const user = new UserModelSettings();

export default user.model;
