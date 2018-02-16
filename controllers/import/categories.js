const { XMLHttpRequest } = require('xmlhttprequest');
const { brewApiKey } = require('../../config.js').secret;
const { CategoryModel } = require('../../db/index.js');

const saveCategory = (category) => {
  const promise = new Promise((resolve) => {
    const curCategory = new CategoryModel({ name: category.name });
    curCategory.save(() => resolve(category));
  });
  return promise;
};

const importCategory = categories => Promise.all(categories.map(saveCategory));

module.exports = (req, res) => {
  const apiUrl = `http://api.brewerydb.com/v2/categories?key=${brewApiKey}`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', apiUrl);
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const { data } = JSON.parse(xhr.responseText);
      importCategory(data)
        .then(data => res.json({ message: `added: ${data.length}` }))
        .catch(err => res.json({ message: err.message }));
    }
  }
}