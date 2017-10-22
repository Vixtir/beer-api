const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { beerModel } = require('../models/db.js');

module.exports = function(app, db){
  app.get('/api/beers', (req, res) => {
    const query = beerModel.where({})

    query
      .find()
      .populate(
        {
          path: 'style',
          model: 'Style',
          populate: {
            path: 'category',
            model: 'Category'
          }
        }
      )
      .exec(function(err, beers){
      if(err) res.json(err);

      res.json(beers)
    })
  })

  app.delete('/api/beers', (req, res) => {
    const query = beerModel.where({})

    query.remove(function(err, beers){
      if(err) res.json(err);

      res.json(beers)
    })
  })
}

