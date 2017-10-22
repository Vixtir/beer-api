const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  icon: String,
  medium: String,
  large: String
});



module.exports = labelSchema