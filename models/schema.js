const mongoose        = require('mongoose');
const beerSchema      = require('./beer.js');
const labelSchema     = require('./label.js');
const styleSchema     = require('./style.js');
const categorySchema  = require('./category.js')

module.exports = {
  beerSchema,
  labelSchema,
  styleSchema,
  categorySchema
}