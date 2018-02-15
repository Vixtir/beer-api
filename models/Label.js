const mongoose = require('mongoose');

const LabelSchema = mongoose.Schema({
  icon: String,
  medium: String,
  large: String,
});

module.exports = LabelSchema;
