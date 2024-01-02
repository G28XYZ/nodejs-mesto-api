const express = require('express');
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
  DEFAULT_BASE_PATH,
  DEFAULT_MONGO_DB_NAME,
  DEFAULT_MONGO_DB_PATH,
  DEFAULT_PORT,
} = require('./src/utils/constants');

const {
  PORT = DEFAULT_PORT,
  BASE_PATH = DEFAULT_BASE_PATH,
  DATABASE = `${DEFAULT_MONGO_DB_PATH}/${DEFAULT_MONGO_DB_NAME}`,
} = process.env;

const app = express();
mongoose.connect(DATABASE);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.table({
    PORT: `App listening on port ${PORT}`,
    ADDRESS: `App address ${BASE_PATH}:${PORT}`,
  });
});
