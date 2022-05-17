const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Usename is required'],
    unique: [true, 'Usename is already taken'],
  },

  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },

  isSuspended: {
    type: Boolean,
    default: false,
  },
});

const userModel = model('users', userSchema);

module.exports = userModel;
