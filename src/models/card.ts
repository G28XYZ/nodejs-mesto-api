import mongoose from 'mongoose';

import { ICard, TModelSettings } from '../utils/types';
import { user } from './user';

/**
 * модель настроек для карточки с схемами модели данных и ее валидации
 */
class CardModelSettings<T extends ICard> implements TModelSettings<T> {
  nameModel = 'card';

  validationSchema = {};

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
