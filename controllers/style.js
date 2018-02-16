const { StyleModel } = require('../db/index.js');

const getStyleList = (req, res) => {
  const query = StyleModel.where({});
  const cb = (err, styles) => res.json(err || styles);

  query.find().populate('category').exec(cb);
};

const deleteStyles = (req, res) => {
  const query = StyleModel.where({});
  query.remove((err, styles) => res.json(err || styles));
};

module.exports.getStyleList = getStyleList;
module.exports.deleteStyles = deleteStyles;
