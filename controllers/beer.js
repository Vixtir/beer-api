const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { beerModel } = require('../models/db.js');

module.exports = function(app, db){
  app.get('/api/beers', (req, res) => {
    const query = beerModel.where({})

    query.find(function(err, beers){
      if(err) res.json(err);

      res.json(beers)
    })
  })

  app.get('/beers',(req, res) => {
    res.json({'message': '/beers'})
  })

  app.post('/beer', (req, res) => {
    res.json({'message': '/beer'})
  })
}
