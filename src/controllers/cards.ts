import { TControllerParameters } from '../utils/types';
import Card from '../models/card';
import { catchError } from '../utils/decorators';

/** контроллер для {@link Card} */
export default class {
  /** получить массив всех карточек */
  @catchError()
  static async getCards(...[_, res]: TControllerParameters) {
    res.send(await Card.find());
  }
}
