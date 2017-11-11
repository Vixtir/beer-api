const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { beerModel } = require('../models/db.js');

exports.getBeerList = function(req, res){
  const LIMIT = 12;
  let cb = (err, beers) => {
    err ? res.json(err)
        : res.json(beers)
  }
  const result = req.query.name ? beerModel.searchByName(req.query.name, LIMIT, cb)
                                : beerModel.search(LIMIT, cb);
}

exports.deleteBeers = function(req, res){
  const query = beerModel.where({})

  query.remove(function (err, beers) {
    err ? res.json(err) : res.json(beers); 
  })
}

exports.getBeer = function(req, res){
  const id = req.params.id;
  let cb = (err, beer) => {
    err ? res.json(err)
        : res.json(beer)
    }
  const result = beerModel.searchById(id, cb);
}