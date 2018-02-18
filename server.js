const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./controllers/index.js');
const db = require('./db/index.js');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || require('./config.js').secret.JWT_SECRET;

const port = 3000;
const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const checkUser = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decode) => {
      req.user = decode ? decode : undefined;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
};

app.use(checkUser);

routes(app, db);

app.get('/', (req, res) => { res.render('main'); });
app.get('/register', (req, res) => { res.status(200).render('register'); });
app.get('/login', (req, res) => { res.status(200).render('login'); });
app.get('/admin', (req, res) => { res.status(200).render('admin'); });

app.listen(port, () => { console.log(`server is running on ${port} port`); });
