import {
  ERROR_MESSAGES,
  HTTP_CODES,
  TControllerParameters,
} from '../utils/types';
import Card from '../models/card';
import catchError from '../utils/decorators';
import ValidationError from '../errors/validation-error';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';

// prettier-ignore
const {
  INVALID_CARD,
  DELETE_ANOTHER_CARD,
  NOT_FOUND_CARD,
  INVALID_ID_CARD,
} = ERROR_MESSAGES;

/** контроллер для {@link Card} */
export default class {
  /** получить массив всех карточек */
  @catchError()
  static async getCards(...[_, res]: TControllerParameters) {
    res.send(await Card.find());
  }

  /** создать карточку */
  @catchError(new ValidationError(INVALID_CARD))
  static async createCard(...[req, res]: TControllerParameters) {
    const { name, link } = req.body;
    const owner = req?.user?._id;
    const card = await Card.create({ name, link, owner });
    res.status(HTTP_CODES.CREATED_201).send(card);
  }

  /** удалить карточку */
  @catchError(INVALID_ID_CARD)
  static async deleteCard(...[req, res, next]: TControllerParameters) {
    const card = await Card.findById(req.params.cardId);

    if (!card) return next(new NotFoundError(NOT_FOUND_CARD));

    if (req?.user?._id === card.owner.toString()) {
      return res.send(await Card.findByIdAndDelete(req.params.cardId));
    }
    return next(new ForbiddenError(DELETE_ANOTHER_CARD));
  }
}
