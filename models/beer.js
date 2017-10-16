const mongoose = require('mongoose');

const beerSchema = mongoose.Schema({
  name: String,
  nameDisplay: String,
  description: String,
  abv: Number,
  ibu: Number,
  isOrganic: String,
  labels: Number,
  styleId: Number,
  servingTemperature: String,
  servingTemperatureDisplay: String
});



module.exports = beerSchema