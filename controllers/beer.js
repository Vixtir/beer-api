const { BeerModel } = require('../models/db.js');
const path = require('path');
const pug = require('pug');

const getBeerList = (req, res) => {
  const LIMIT = 12;
  const cb = (err, beers) => res.json(err || beers);
  const result = req.query.name
    ? BeerModel.searchByName(req.query.name, LIMIT, cb)
    : BeerModel.search(LIMIT, cb);
  return result;
};

const deleteBeers = (req, res) => {
  const query = BeerModel.where({});
  query.remove((err, beers) => res.json(err || beers));
};

const getBeer = (req, res) => {
  const { id } = req.params;
  const cb = (err, beer) => res.json(err || beer);
  BeerModel.searchById(id, cb);
};

const prepareModalLocal = (beer) => {
  const {
    name: beerName,
    description: beerDesc,
    isOrganic,
    style: {
      ogMin = '-',
      srmMax = '-',
      srmMin = '-',
      abvMin = '-',
      abvMax = '-',
      ibuMin = '-',
      ibuMax = '-',
      description: fullDesc,
      category: {
        name: beerCategory,
      },
    },
  } = beer;
  const locals = {
    beerName,
    beerDesc: fullDesc || beerDesc,
    isOrganic,
    prop: {
      OG: ogMin || '-',
      SRM: `${srmMin}-${srmMax}`,
      ABV: `${abvMin}-${abvMax}`,
      IBU: `${ibuMin}-${ibuMax}`,
    },
    fullDesc,
    beerCategory,
  };
  return locals;
};

const getModalBeer = (req, res) => {
  const { id } = req.params;
  const modalTmpl = pug.compileFile(path.join(`${__dirname}/../views/modal.pug`));
  const cb = (err, beer) => {
    if (err) {
      res.json(err);
    } else {
      const locals = prepareModalLocal(beer);
      res.send(modalTmpl(locals));
    }
  };

  BeerModel.searchById(id, cb);
};

module.exports.getModalBeer = getModalBeer;
module.exports.getBeer = getBeer;
module.exports.deleteBeers = deleteBeers;
module.exports.getBeerList = getBeerList;
