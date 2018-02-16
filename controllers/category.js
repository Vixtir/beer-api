const { CategoryModel } = require('../db/index.js');

const getCategoryList = (req, res) => {
  const query = CategoryModel.where({});
  query.find((err, categories) => res.json(err || categories));
};

const deleteCategories = (req, res) => {
  const query = CategoryModel.where({});
  query.remove((err, categories) => res.json(err || categories));
};

module.exports.getCategoryList = getCategoryList;
module.exports.deleteCategories = deleteCategories;
