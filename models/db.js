const mongoose = require('mongoose');
const schema   = require('./schema.js'); 

const url = 'mongodb://localhost:27017/myproject';

mongoose.connect(url);
let db = mongoose.createConnection(url, {promiseLibrary: global.Promise});

db.on('error', console.error.bind(console, `db connection error`))

db.once('open', function(){
  console.log(`db is connected`)
})

module.exports = {
  beerModel:     mongoose.model('Beer', schema.beerSchema),
  styleModel:    mongoose.model('Style', schema.styleSchema),
  labelModel:    mongoose.model('Label', schema.labelSchema),
  categoryModel: mongoose.model('Category', schema.categorySchema)
};