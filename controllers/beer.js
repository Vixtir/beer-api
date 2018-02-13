const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { beerModel }  = require('../models/db.js');
const path           = require('path');
const pug            = require('pug');

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
  beerModel.searchById(id, cb);
}

function prepareModalLocal(beer){
  const _beer = Object.create(beer);
  let locals;
  let { name : beerName, 
        description : beerDesc,
        isOrganic,
        style : {
          ogMin = '-',
          srmMax = '-',
          srmMin = '-',
          abvMin = '-',
          abvMax = '-',
          ibuMin = '-',
          ibuMax = '-',
          description : fullDesc,
          category : {
            name: beerCategory
          }
        }
      } = _beer;
  locals = {
    beerName,
    beerDesc: fullDesc || beerDesc,
    isOrganic,
    prop: {
      OG: ogMin||'-',
      SRM: `${srmMin}-${srmMax}`,
      ABV: `${abvMin}-${abvMax}`,
      IBU: `${ibuMin}-${ibuMax}`
    },
    fullDesc,
    beerCategory
  };
  return locals
};

exports.getModalBeer = function(req, res){
  const id = req.params.id;
  const modalTmpl = pug.compileFile(path.join(`${__dirname}/../views/modal.pug`));
  let cb = (err, beer) => {
    if(err) res.json(err);
    const locals = prepareModalLocal(beer); 
    res.send(modalTmpl(locals));
  }
  beerModel.searchById(id, cb);

}