const mongoose = require('mongoose');

const styleSchema = mongoose.Schema({
  categoryId: Number,
  name: String,
  shortName: String,
  description: String,
  ibuMax: String,
  ibuMin: String,
  abvMin: String,
  abvMax: String,
  srmMin: String,
  srmMax: String,
  ogMin: String,
  fgMin: String,
  fgMax: String
});

module.exports = {
  styleSchema
}