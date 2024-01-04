import { NextFunction, Request, Response } from 'express';
import mongoose, { model, Schema } from 'mongoose';

export type TController = Record<
  string,
  (
    req: Request & Partial<{ user: { _id: string } }>,
    res: Response,
    next: NextFunction,
  ) => Promise<any> | any
>;
/** тип для параметров контроллера */
export type TControllerParameters = Parameters<TController[string]>;

export type TDecoratorMethod = (
  target: Function,
  name: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor;

export type TErrorHandler = <E extends Error>(
  err: string | (E & Request),
  ...args: TControllerParameters
) => any;

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface ICard {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: ICard['owner'][];
  createdAt: Date;
}
/** поля для класса модели */
export type TModelSettings<T> = {
  /** наименование модели */
  nameModel: string;
  /** схема валидации */
  validationSchema: Record<string, any>;
  /** схема модели */
  schema: Schema<T>;
  /** модель */
  get model(): ReturnType<typeof model>;
};

// eslint-disable-next-line no-shadow
export enum ERROR_MESSAGES {
  AVATAR = 'Некорректный адрес ссылка для аватарки',
  USERNAME = 'Имя должно содержать не меньше 2 символов и не больше 30',
  ABOUT = 'Описание о себе должно содержать не меньше 2 символов и не больше 30',
  CARD_NAME = 'Название должно содержать не меньше 2 символов и не больше 30',
  CARD_LINK = 'Некорректный адрес ссылки для карточки',
  INVALID_CARD = 'Некорректные данные при создании карточки',
  DELETE_ANOTHER_CARD = 'Попытка удалить чужую карточку',
  NOT_FOUND_CARD = 'Карточки не существует',
  INVALID_ID_CARD = 'Некорректный идентификатор карточки',
}

/**
 * @see {@link https://ru.wikipedia.org/wiki/Список_кодов_состояния_HTTP}
 * коды ошибок по типу
 */
// eslint-disable-next-line no-shadow
export enum HTTP_CODES {
  CONTINUE_100 = 100,
  SWITCHING_PROTOCOLS_101 = 101,
  PROCESSING_102 = 102,
  OK_200 = 200,
  CREATED_201 = 201,
  ACCEPTED_202 = 202,
  NON_AUTHORITATIVE_INFORMATION_203 = 203,
  NO_CONTENT_204 = 204,
  RESET_CONTENT_205 = 205,
  PARTIAL_CONTENT_206 = 206,
  MULTI_STATUS_207 = 207,
  ALREADY_REPORTED_208 = 208,
  IM_USED_226 = 226,
  MULTIPLE_CHOICES_300 = 300,
  MOVED_PERMANENTLY_301 = 301,
  FOUND_302 = 302,
  SEE_OTHER_303 = 303,
  NOT_MODIFIED_304 = 304,
  USE_PROXY_305 = 305,
  SWITCH_PROXY_306 = 306,
  TEMPORARY_REDIRECT_307 = 307,
  PERMANENT_REDIRECT_308 = 308,
  BAD_REQUEST_400 = 400,
  UNAUTHORIZED_401 = 401,
  PAYMENT_REQUIRED_402 = 402,
  FORBIDDEN_403 = 403,
  NOT_FOUND_404 = 404,
  METHOD_NOT_ALLOWED_405 = 405,
  NOT_ACCEPTABLE_406 = 406,
  PROXY_AUTHENTICATION_REQUIRED_407 = 407,
  REQUEST_TIMEOUT_408 = 408,
  CONFLICT_409 = 409,
  GONE_410 = 410,
  LENGTH_REQUIRED_411 = 411,
  PRECONDITION_FAILED_412 = 412,
  PAYLOAD_TOO_LARGE_413 = 413,
  URI_TOO_LONG_414 = 414,
  UNSUPPORTED_MEDIA_TYPE_415 = 415,
  RANGE_NOT_SATISFIABLE_416 = 416,
  EXPECTATION_FAILED_417 = 417,
  I_AM_A_TEAPOT_418 = 418,
  MISDIRECTED_REQUEST_421 = 421,
  UNPROCESSABLE_ENTITY_422 = 422,
  LOCKED_423 = 423,
  FAILED_DEPENDENCY_424 = 424,
  UPGRADE_REQUIRED_426 = 426,
  PRECONDITION_REQUIRED_428 = 428,
  TOO_MANY_REQUESTS_429 = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE_431 = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS_451 = 451,
  INTERNAL_SERVER_ERROR_500 = 500,
  NOT_IMPLEMENTED_501 = 501,
  BAD_GATEWAY_502 = 502,
  SERVICE_UNAVAILABLE_503 = 503,
  GATEWAY_TIMEOUT_504 = 504,
  HTTP_VERSION_NOT_SUPPORTED_505 = 505,
  VARIANT_ALSO_NEGOTIATES_506 = 506,
  INSUFFICIENT_STORAGE_507 = 507,
  LOOP_DETECTED_508 = 508,
  NOT_EXTENDED_510 = 510,
  NETWORK_AUTHENTICATION_REQUIRED_511 = 511,
}
