const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { brewApiKey } = require("../../config.js").secret;
const { categoryModel, beerModel, styleModel, labelModel } = require('../../models/db.js');

function saveBeer(importBeer){
  return new Promise((resolve, reject) => {
    let newBeer = new beerModel();
    newBeer.name                      = importBeer.name;
    newBeer.nameDisplay               = importBeer.nameDisplay;
    newBeer.description               = importBeer.description;
    newBeer.abv                       = importBeer.abv;
    newBeer.ibu                       = importBeer.ibu;
    newBeer.isOrganic                 = importBeer.isOrganic;
    newBeer.servingTemperature        = importBeer.servingTemperature;
    newBeer.servingTemperatureDisplay = importBeer.servingTemperatureDisplay;
    newBeer.labels = importBeer.labels;


    let styleQuery = styleModel.where({ 'name': importBeer.style.name })
    styleQuery.findOne((err, style) => {
      newBeer.style = style._id;
      newBeer.save((err, newBeer)=>{ 
        if(err){
          reject(new Error(err))
        } else {
          console.dir('saved')
          resolve(newBeer);
        }
      });
    })
  })
}

function importBeers(beers){
  const _beers = beers.slice();
  return Promise.all(beers.map(saveBeer));
}

function makeRequest(numPage){
    const apiUrl = `http://api.brewerydb.com/v2/search?key=${brewApiKey}&q=a&p=${numPage}&type=beer`
    console.dir(apiUrl);
    return new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.send();
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200){
        const data = JSON.parse(xhr.responseText).data;
        importBeers(data)
          .then( res => {
            console.dir(res);
            resolve()}
           )
          .catch( err => reject(err))
      }
    }
  })
}

function promiseRequests(){
  let pagesArray = [];
  for(let numPage = 1; numPage < 100; numPage++){
    pagesArray.push(numPage);
  }
  return Promise.all(pagesArray.map(makeRequest));
}

module.exports = function(app){
  app.get('/import/beers', (req, res) => {
    promiseRequests()
      .then( result => res.json({"message": "added"}))
      .catch( err => res.json({"message": err}))
  })
}
