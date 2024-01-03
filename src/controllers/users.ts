import { STATUS_CODES } from 'http';

import { HTTP_CODES, TControllerParameters } from '../utils/types';
import User from '../models/user';
import { catchError } from '../utils/decorators';

const { NOT_FOUND_404 } = HTTP_CODES;

/** контроллер для {@link User} */
export default class {
  /** получить список всех пользователей */
  @catchError()
  static async getUsers(...[_, res]: TControllerParameters) {
    res.send(await User.find());
  }

  /** получить пользователя по id */
  @catchError(`${STATUS_CODES[NOT_FOUND_404]} user`)
  static async getUser(...[req, res]: TControllerParameters) {
    res.send(await User.findById(req.params.userId));
  }

  /** создать пользователя */
  @catchError()
  static async createUser(...[req, res]: TControllerParameters) {
    const { name, about, avatar } = req.body;
    await User.create({ name, about, avatar });
    res.send({ name, about, avatar });
  }
}
