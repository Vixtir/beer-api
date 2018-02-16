const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.search = function search(cb) {
  this.where({})
    .find()
    .exec(cb);
};

UserSchema.statics.comparePassword = function comparePassword(user, password) {
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);
