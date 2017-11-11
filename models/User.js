const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.search = function search(cb) {
  this.where({})
    .find()
    .exec(cb);
}

userSchema.statics.comparePassword = function comparePassword(user, password){
  return bcrypt.compare(password, user.password)
}

module.exports = userSchema;