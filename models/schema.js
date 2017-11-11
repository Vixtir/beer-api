const mongoose        = require('mongoose');
const beerSchema      = require('./Beer.js');
const labelSchema     = require('./Label.js');
const styleSchema     = require('./Style.js');
const categorySchema  = require('./Category.js');
const userSchema      = require('./User.js');

module.exports = {
  beerSchema,
  labelSchema,
  styleSchema,
  categorySchema,
  userSchema
}