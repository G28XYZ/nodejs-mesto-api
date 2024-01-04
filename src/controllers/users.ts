import {
  ERROR_MESSAGES,
  HTTP_CODES,
  TControllerParameters,
} from '../utils/types';
import User from '../models/user';
import catchError from '../utils/decorators';
import NotFoundError from '../errors/not-found-error';

const { CREATED_201 } = HTTP_CODES;

/** контроллер для {@link User} */
export default class {
  /** получить список всех пользователей */
  @catchError()
  static async getUsers(...[_, res]: TControllerParameters) {
    return res.send(await User.find());
  }

  /** получить пользователя по id */
  @catchError(new NotFoundError(ERROR_MESSAGES.NOT_FOUND_USER))
  static async getUser(...[req, res]: TControllerParameters) {
    return res.send(await User.findById(req.params.userId));
  }

  /** создать пользователя */
  @catchError()
  static async createUser(...[req, res]: TControllerParameters) {
    const { name, about, avatar } = req.body;
    await User.create({ name, about, avatar });
    return res.status(CREATED_201).send({ name, about, avatar });
  }

  /** обновить профиль пользователя */
  @catchError()
  static async updateProfile(...[req, res, next]: TControllerParameters) {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { runValidators: true },
    );

    if (!user) return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND_USER));

    return res.send({
      _id: user?._id,
      avatar: user?.avatar,
      name,
      about,
    });
  }

  /** обновить аватар пользователя */
  @catchError()
  static async updateAvatar(...[req, res, next]: TControllerParameters) {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req?.user?._id,
      { avatar },
      { runValidators: true },
    );

    if (!user) return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND_USER));

    return res.send({
      _id: user?._id,
      avatar,
      name: user?.name,
      about: user?.about,
    });
  }
}
