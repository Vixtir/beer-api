const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const {
  beerModel
} = require('../models/db.js');

module.exports = function (app, db) {

  app.get('/api/beers', (req, res) => {
    const LIMIT = 12;
    let cb = (err, beers) => {
      err ? res.json(err)
          : res.json(beers)
    }
    console.dir(req.query);
    const result = req.query.name ? beerModel.searchByName(req.query.name, LIMIT, cb)
                                  : beerModel.search(LIMIT, cb);
  })

  app.delete('/api/beers', (req, res) => {
    const query = beerModel.where({})

    query.remove(function (err, beers) {
      if (err) res.json(err);

      res.json(beers)
    })
  })

  app.get('/api/beer/:id', (req, res) => {
    const id = req.params.id;
    let cb = (err, beer) => {
      err ? res.json(err)
          : res.json(beer)
    }
    const result = beerModel.searchById(id, cb);
  })
}