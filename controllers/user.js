const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { userModel } = require('../models/db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config.js").secret;

function findUser(name){
  const query = userModel.where({ name: name });
  return query.findOne();
}

function createJwt(user){
  let {name} = user;
  return jwt.sign({name}, jwtSecret);
}

exports.registerUser = function(req, res){
  const { name, password } = req.body;
  if(name && password){
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds)
      .then( salt => bcrypt.hash(password, salt))
      .then( hash => {
        let user = new userModel({ name, password: hash });
        return user.save();
      })
      .then( user => { res.json(user) })
      .catch( err => res.status(500).json(err.message));
  }
}

exports.loginUser = function(req, res){
  const { name, password } = req.body;
  let currentUser;
  findUser(name)
    .then( user => {
      if(user){
        currentUser = user;
        return user;
      } else {
        throw Error('User not found');
      }
    })
    .then( user => userModel.comparePassword(user, password))
    .then( isEqualPassword => {
      if(isEqualPassword){
        return createJwt(currentUser)
      } else {
        throw Error('Password is incorrect');
      }
    })
    .then( token => res.status(200).json({token}))
    .catch( err => res.status(500).json(err.message))
}

exports.requireLogin = function(req, res, next){
  req.user ? next() : res.status(401).json({'message': 'auth error'})
}