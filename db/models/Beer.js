const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
  name: String,
  nameDisplay: String,
  description: String,
  abv: Number,
  ibu: Number,
  isOrganic: String,
  servingTemperature: String,
  servingTemperatureDisplay: String,
  labels: mongoose.Schema.Types.Mixed,
  style: {
    type: mongoose.Schema.ObjectId,
    ref: 'Style',
  },
});

BeerSchema.statics.searchById = function searchById(id, cb) {
  this
    .findOne({ '_id':id })
    .populate({
      path: 'style',
      model: 'Style',
      populate: {
        path: 'category',
        model: 'Category',
      },
    })
    .exec(cb);
};

BeerSchema.statics.searchByName = function searchByName(name, limit = 10, cb) {
  this.where('name', new RegExp(`${name}`, 'i'))
    .find()
    .limit(limit)
    .populate({
      path: 'style',
      model: 'Style',
      populate: {
        path: 'category',
        model: 'Category',
      },
    })
    .exec(cb);
};

BeerSchema.statics.search = function search(limit = 10, cb) {
  this.where({})
    .find()
    .limit(limit)
    .populate({
      path: 'style',
      model: 'Style',
      populate: {
        path: 'category',
        model: 'Category',
      },
    })
    .exec(cb);
};

module.exports = mongoose.model('Beer', BeerSchema);
