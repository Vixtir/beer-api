const { styleModel } = require('../models/db.js');

module.exports = function(app, db){
  app.get('/api/styles', (req, res) => {
    const query =styleModel.where({})

    query.find().populate('category').exec(function(err, styles){
      if(err) res.json(err);
      res.json(styles)
    })
  })

  app.delete('/api/styles', (req, res) => {
    const query =styleModel.where({})

    query.remove(function(err, styles){
      if(err) res.json(err);

      res.json(styles)
    })
  })
}