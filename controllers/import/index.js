const importCategories = require('./categories');
const importStyles = require('./styles');
const importBeers = require('./beers');

module.exports = function(app){
  importCategories(app);
  importStyles(app);
  importBeers(app);
}