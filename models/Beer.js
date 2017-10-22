const mongoose = require('mongoose');

const beerSchema = mongoose.Schema({
  name: String,
  nameDisplay: String,
  description: String,
  abv: Number,
  ibu: Number,
  isOrganic: String,
  servingTemperature: String,
  servingTemperatureDisplay: String,
  labels: mongoose.Schema.Types.Mixed,
  style: {type: mongoose.Schema.ObjectId, ref: 'Style'},
});



module.exports = beerSchema