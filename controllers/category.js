const { categoryModel } = require('../models/db.js');

exports.getCategoryList = function(req, res){
  const query =categoryModel.where({})
  query.find(function(err, categories){
    err ? res.json(err) 
        : res.json(categories)
  })
}

exports.deleteCategories = function(req, res){
  const query =categoryModel.where({})
  query.remove(function(err, categories){
    err ? res.json(err)
        : res.json(categories)
  })
}