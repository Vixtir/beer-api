const mongoose = require('mongoose');

const StyleSchema = mongoose.Schema({
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
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
  fgMax: String,
});

module.exports = StyleSchema;
