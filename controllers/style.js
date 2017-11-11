const { styleModel } = require('../models/db.js');

exports.getStyleList = function(req, res){
  const query =styleModel.where({})
  let cb = (err, styles) => {
    err ? res.json(err) : res.json(styles);
  }
  query.find().populate('category').exec(cb)
}

exports.deleteStyles = function(req, res){
  const query =styleModel.where({})
  query.remove(function(err, styles){
    err ? res.json(err) : res.json(styles)
  })
}