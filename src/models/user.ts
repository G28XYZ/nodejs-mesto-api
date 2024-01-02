const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
