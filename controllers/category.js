const { categoryModel } = require('../models/db.js');

module.exports = function(app, db){
  app.get('/api/categories', (req, res) => {
    const query =categoryModel.where({})

    query.find(function(err, categories){
      if(err) res.json(err);

      res.json(categories)
    })
  })

  app.delete('/api/categories', (req, res) => {
    const query =categoryModel.where({})

    query.remove(function(err, categories){
      if(err) res.json(err);

      res.json(categories)
    })
  })
}