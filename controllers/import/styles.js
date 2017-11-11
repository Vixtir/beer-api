const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { brewApiKey } = require("../../config.js").secret;
const { categoryModel, styleModel } = require('../../models/db.js');

function saveStyle(importStyle){
  return new Promise((resolve, reject) => {
    let newStyle = new styleModel();
    
    newStyle.name = importStyle.name;
    newStyle.shortName =  importStyle.shortName;
    newStyle.description = importStyle.description;
    newStyle.ibuMax = importStyle.ibuMax;
    newStyle.ibuMin = importStyle.ibuMin;
    newStyle.abvMin = importStyle.abvMin;
    newStyle.abvMax = importStyle.abvMax;
    newStyle.srmMin = importStyle.srmMin;
    newStyle.srmMax = importStyle.srmMax;
    newStyle.ogMin = importStyle.ogMin;
    newStyle.fgMin = importStyle.fgMin;
    newStyle.fgMax = importStyle.fgMax;

    if(importStyle.categoryId){
      let categoryQuery = categoryModel.where({ 'name': importStyle.category.name })
      categoryQuery.findOne((err, category) => {
        newStyle.category = category._id;
        newStyle.save((err, newStyle)=>{ 
          if(err){
            reject(new Error(err))
          } else {
            resolve(newStyle);
          }
        });
      })
    } else {
      newStyle.save((err, newStyle)=>{
        if(err){
          reject(new Error(err))
        } else {
          resolve(newStyle);
        } 
      });
    }

  })
}

function importStyle(styles){
  const _styles = styles.slice();
  return Promise.all(styles.map(saveStyle));
}


module.exports = function(req, res){
  const apiUrl = `http://api.brewerydb.com/v2/styles?key=${brewApiKey}`

  let xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200){
      const data = JSON.parse(xhr.responseText).data;
      importStyle(data)
        .then(data => res.json({"message": `added: ${data.length}`}))
        .catch(err => res.json({"message": err.message }))
    }
  }
}
