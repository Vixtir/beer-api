const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  beerId: Number,
  icon: String,
  medium: String,
  large: String
});

module.exports = {
  labelSchema
}