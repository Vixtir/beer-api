const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { userModel } = require('../models/db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config.js").secret;

function findUser(name, password){
  const query = userModel.where({ name: name });
  return query.findOne();
}

function createJwt(user){
  let {name} = user;
  return jwt.sign({name}, jwtSecret);
}

exports.registerUser = function(req, res){
  const { name, pswd } = req.body;
  if(name && pswd){
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds)
      .then( salt => bcrypt.hash(pswd, salt))
      .then( hash => {
        let user = new userModel({ name, password: hash });
        return user.save();
      })
      .then( user => { res.json(user) })
      .catch( err => res.json(err));
  } else {
    res.json({message: 'error'});
  }
}

exports.loginUser = function(req, res){
  const { name, password } = req.body;
  let currentUser;
  findUser(name, password)
    .then( user => {
      currentUser = user;
      return user;
    })
    .then( user => userModel.comparePassword(user, password))
    .then( isEqualPassword => {
      if(isEqualPassword){
        return createJwt(currentUser)
      } else {
        throw Error('fail');
      }
    })
    .then( token => {
      res.status(200).json(token)
    })
    .catch( err => res.status(401).json(err))
}

exports.requireLogin = function(req, res, next){
  if(req.user){
    next()
  } else {
    res.json({'message': 'auth error'})
  }
}