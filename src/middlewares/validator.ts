import { Joi, Segments, celebrate } from 'celebrate';
import { TModelSettings } from '../utils/types';

/**
 * мидлвар для валидации полей модели
 * @param segment - наименование поля тела запроса для проверки
 * @param schema - схема валидации
 * @returns - обработчик запроса (RequestHandler)
 */
export default function validator(
  segment: Segments,
  schema: TModelSettings<any>['validationSchema'][string],
) {
  return celebrate({
    [segment]: Joi.object().keys(schema),
  });
}
