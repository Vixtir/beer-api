const beer = require('./beer.js');
const importData = require('./importData.js');

module.exports = function(app, db){
  beer(app, db);
  importData(app);
}