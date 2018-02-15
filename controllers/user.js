const { UserModel } = require('../models/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.js').secret;

const findUser = (name) => {
  const query = UserModel.where({ name });
  return query.findOne();
};

const createJwt = ({ name }) => jwt.sign({ name }, jwtSecret);

const registerUser = (req, res) => {
  const { name, password } = req.body;
  if (name && password) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then((hash) => {
        const user = new UserModel({ name, password: hash });
        return user.save();
      })
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err.message));
  }
};

const loginUser = (req, res) => {
  const { name, password } = req.body;
  let currentUser;
  findUser(name)
    .then((user) => {
      if (user) {
        currentUser = user;
      } else {
        throw Error('User not found');
      }
      return currentUser;
    })
    .then(user => UserModel.comparePassword(user, password))
    .then((isEqualPassword) => {
      if (!isEqualPassword) {
        throw Error('Password is incorrect');
      }

      return createJwt(currentUser);
    })
    .then(token => res.status(200).json({ token }))
    .catch(err => res.status(500).json(err.message));
};

const requireLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'auth error' });
  }
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.requireLogin = requireLogin;
