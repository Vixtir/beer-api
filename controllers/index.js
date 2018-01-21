const beer = require('./beer.js');
const category = require('./category.js');
const style = require('./style.js');
const user = require('./user.js')
const importBeers = require('./import/beers.js');
const importCategories = require('./import/categories.js');
const importStyles = require('./import/styles.js');

module.exports = function(app, db){
  //Beer
  app.route('/api/beers')
    .get(beer.getBeerList)
    .delete(beer.deleteBeers);

  app.route('/api/beer/:id')
    .get(beer.getBeer);
  app.route('/api/beerModal/:id')
    .get(beer.getModalBeer);  
  app.route('import/beers')
    .post(user.requireLogin, importBeers)
  //Category
  app.route('/api/categories')
    .get(category.getCategoryList)
    .delete(category.deleteCategories);
  app.route('/import/categories')
    .post(user.requireLogin, importCategories)
  //Style
  app.route('/api/styles')
    .get(style.getStyleList)
    .delete(style.deleteStyles);
  app.route('import/styles')
    .post(user.requireLogin, importStyles)
  //User
  app.route('/login')
    .post(user.loginUser)
  app.route('/register')
    .post(user.registerUser)

}