const { XMLHttpRequest } = require('xmlhttprequest');
const { brewApiKey } = require('../../config.js').secret;
const { CategoryModel, StyleModel } = require('../../models/db.js');

const saveStyle = (importStyle) => {
  const promise = new Promise((resolve, reject) => {
    const newStyle = new StyleModel();

    newStyle.name = importStyle.name;
    newStyle.shortName = importStyle.shortName;
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

    if (importStyle.categoryId) {
      const categoryQuery = CategoryModel.where({ name: importStyle.category.name });
      categoryQuery.findOne((err, category) => {
        newStyle.category = category._id;
        newStyle.save((err, newStyle) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(newStyle);
          }
        });
      });
    } else {
      newStyle.save((err, newStyle) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(newStyle);
        }
      });
    }
  });

  return promise;
};

const importStyle = styles => Promise.all(styles.map(saveStyle));

module.exports = (req, res) => {
  const apiUrl = `http://api.brewerydb.com/v2/styles?key=${brewApiKey}`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', apiUrl);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const { data } = JSON.parse(xhr.responseText);
      importStyle(data)
        .then(data => res.json({ message: `added: ${data.length}` }))
        .catch(err => res.json({ message: err.message }));
    }
  }
}
