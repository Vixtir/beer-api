const { XMLHttpRequest } = require('xmlhttprequest');
const { brewApiKey } = process.env.BREW_API || require('../../config.js').secret.BREW_API;
const { BeerModel, StyleModel } = require('../../db/index.js');

const saveBeer = (importBeer) => {
  const promise = new Promise((resolve, reject) => {
    const newBeer = new BeerModel();
    newBeer.name = importBeer.name;
    newBeer.nameDisplay = importBeer.nameDisplay;
    newBeer.description = importBeer.description;
    newBeer.abv = importBeer.abv;
    newBeer.ibu = importBeer.ibu;
    newBeer.isOrganic = importBeer.isOrganic;
    newBeer.servingTemperature = importBeer.servingTemperature;
    newBeer.servingTemperatureDisplay = importBeer.servingTemperatureDisplay;
    newBeer.labels = importBeer.labels;


    const styleQuery = StyleModel.where({ name: importBeer.style.name })
    styleQuery.findOne((err, style) => {
      newBeer.style = style._id;
      newBeer.save((err) => {
        if (err) {
          reject(new Error(err));
        } else {
          console.dir('saved');
          resolve(newBeer);
        }
      });
    });
  });

  return promise;
};

const importBeers = beers => Promise.all(beers.map(saveBeer));

const makeRequest = (numPage) => {
  const apiUrl = `http://api.brewerydb.com/v2/search?key=${brewApiKey}&q=a&p=${numPage}&type=beer`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const { data } = JSON.parse(xhr.responseText);
        importBeers(data)
          .then((res) => {
            resolve(res);
          })
          .catch(err => reject(err));
      }
    };
  });
};

const promiseRequests = () => {
  const pagesArray = [];
  for (let numPage = 1; numPage < 100; numPage += 1) {
    pagesArray.push(numPage);
  }
  return Promise.all(pagesArray.map(makeRequest));
};

module.exports = function (req, res) {
  promiseRequests()
    .then(() => res.json({ message: 'added' }))
    .catch(err => res.json({ message: err }));
};
