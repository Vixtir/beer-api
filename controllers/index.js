const beer = require('./beer.js');
const importData = require('./import/index.js');
const category = require('./category.js');
const style = require('./style.js')

module.exports = function(app, db){
  beer(app, db);
  category(app, db);
  importData(app);
  style(app, db);
}