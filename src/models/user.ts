import mongoose from 'mongoose';
import { Joi } from 'celebrate';

import { IUser, TModelSettings } from '../utils/types';
import { ERROR_MESSAGES } from '../utils/constants';
import validationURL from '../utils/validation-url';

/**
 * модель настроек для пользователя с схемами модели данных и ее валидации
 */
class UserModelSettings<T extends IUser> implements TModelSettings<T> {
  nameModel = 'user';

  validationSchema = {
    create: {
      name: Joi.string()
        .min(2)
        .rule({ message: ERROR_MESSAGES.name })
        .max(30)
        .rule({ message: ERROR_MESSAGES.name })
        .required(),
      about: Joi.string().min(2).max(30).required(),
      avatar: Joi.string()
        .required()
        // uri некорректно валидирует ссылку, поэтому вместо нее custom с методом из validator
        .custom(validationURL(ERROR_MESSAGES.avatar)),
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
