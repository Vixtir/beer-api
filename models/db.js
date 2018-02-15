const mongoose = require('mongoose');
const BeerSchema = require('./Beer.js');
const StyleSchema = require('./Style.js');
const CategorySchema = require('./Category.js');
const UserSchema = require('./User.js');

const url = 'mongodb://localhost:27017/myproject';


mongoose.connect(url);
const db = mongoose.createConnection(url, { promiseLibrary: global.Promise });

db.on('error', console.error.bind(console, 'db connection error'));

db.once('open', () => console.log('db is connected'));

module.exports = {
  BeerModel: mongoose.model('Beer', BeerSchema),
  StyleModel: mongoose.model('Style', StyleSchema),
  CategoryModel: mongoose.model('Category', CategorySchema),
  UserModel: mongoose.model('User', UserSchema),
};
