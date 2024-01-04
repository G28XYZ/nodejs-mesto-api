import mongoose from 'mongoose';
import { Joi } from 'celebrate';

import { ERROR_MESSAGES, ICard, TModelSettings } from '../utils/types';
import { user } from './user';
import validationURL from '../utils/validation-url';

/**
 * модель настроек для карточки с схемами модели данных и ее валидации
 */
// prettier-ignore next-line
class CardModelSettings<T extends ICard> implements TModelSettings<T> {
  nameModel = 'card';

  validationSchema = {
    /** схема для валидации при создании карточки */
    create: {
      name: Joi.string()
        .min(2)
        .rule({ message: ERROR_MESSAGES.CARD_NAME })
        .max(30)
        .rule({ message: ERROR_MESSAGES.CARD_NAME })
        .required(),
      link: Joi.string()
        .min(2)
        .required()
        // uri некорректно валидирует ссылку, поэтому вместо нее custom с методом из validator
        .custom(validationURL(ERROR_MESSAGES.CARD_LINK)),
    },
  };

  schema = new mongoose.Schema<T>(
    {
      name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
      },
      link: {
        type: String,
        required: true,
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user.nameModel,
        required: true,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: user.nameModel,
          default: [],
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    // убирает поле __v
    { versionKey: false },
  );

  get model() {
    return mongoose.model<T>(this.nameModel, this.schema);
  }
}

export const card = new CardModelSettings();

export default card.model;
