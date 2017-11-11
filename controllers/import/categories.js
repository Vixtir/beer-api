const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { brewApiKey } = require("../../config.js").secret;
const { categoryModel, beerModel, styleModel } = require('../../models/db.js');

function saveCategory(category){
  return new Promise((resolve, reject) => {
    let _category = new categoryModel({name: category.name});
    _category.save((err, category)=>{ resolve(category) });
  })
}

function importCategory(categories){
  const _categories = categories.slice();
  return Promise.all(_categories.map(saveCategory));
}

module.exports = function(req, res){
    const apiUrl = `http://api.brewerydb.com/v2/categories?key=${brewApiKey}`

    let xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200){
        const data = JSON.parse(xhr.responseText).data;
        importCategory(data)
          .then(data => res.json({"message": `added: ${data.length}`}))
          .catch(err => res.json({"message": err.message }))
      }
    }
}