const mongoose        = require('mongoose');
const beerSchema      = require('./Beer.js');
const labelSchema     = require('./Label.js');
const styleSchema     = require('./Style.js');
const categorySchema  = require('./Category.js');
const userSchema      = require('./User.js');
const url = 'mongodb://localhost:27017/myproject';

mongoose.connect(url);
let db = mongoose.createConnection(url, {promiseLibrary: global.Promise});

db.on('error', console.error.bind(console, `db connection error`))

db.once('open', function(){
  console.log(`db is connected`)
})

module.exports = {
  beerModel:     mongoose.model('Beer', beerSchema),
  styleModel:    mongoose.model('Style', styleSchema),
  categoryModel: mongoose.model('Category', categorySchema),
  userModel:     mongoose.model('User', userSchema),
};