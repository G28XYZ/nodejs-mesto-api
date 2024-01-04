import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import {
  DEFAULT_BASE_PATH,
  DEFAULT_MONGO_DB_NAME,
  DEFAULT_MONGO_DB_PATH,
  DEFAULT_PORT,
} from './src/utils/constants';

import cardRouter from './src/routes/cards';
import userRouter from './src/routes/users';
import handleError from './src/errors/error-handler';
import NotFoundError from './src/errors/not-found-error';
import { TControllerParameters } from './src/utils/types';

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then((value) => value.config());
}

const {
  PORT = DEFAULT_PORT,
  BASE_PATH = DEFAULT_BASE_PATH,
  DATABASE = `${DEFAULT_MONGO_DB_PATH}/${DEFAULT_MONGO_DB_NAME}`,
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DATABASE);

app.use((...[req, _, next]: TControllerParameters) => {
  req.user = {
    // _id: '659581da16f52c86a1e4ab25', // user1
    _id: '659624ecaebfc7182a2196b9', // user2
    // _id: '659624ecaebfc7182a2196b7', // fake user
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.all('*', (req, res, next) => next(new NotFoundError()));

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.table({
    PORT: `App listening on port ${PORT}`,
    ADDRESS: `App address ${BASE_PATH}:${PORT}`,
  });
});
