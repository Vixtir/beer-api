const mongoose = require('mongoose');
const BeerModel = require('./models/Beer.js');
const StyleModel = require('./models/Style.js');
const CategoryModel = require('./models/Category.js');
const UserModel = require('./models/User.js');
const {
  dbLogin, dbPassword, dbUri, dbPort, dbShare,
} = require('../config.js').secret;

const mongoDB = `mongodb://${dbLogin}:${dbPassword}@${dbUri}:${dbPort}/${dbShare}`;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', () => console.log('db is connected'));


module.exports = {
  BeerModel,
  StyleModel,
  CategoryModel,
  UserModel,
};
