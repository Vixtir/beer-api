const express         = require('express');
const bodyParser      = require('body-parser');
const path            = require('path');
const routes          = require('./controllers/index.js');
const db              = require('./models/db.js')
const jwt             = require("jsonwebtoken");
const { jwtSecret }   = require("./config.js").secret;

const port            = 3000;
const app             = express();

app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, jwtSecret, function(err, decode){
      req.user = decode ? decode : undefined;
      next();
    })
  } else {
    req.user = undefined;
    next()
  }
})

routes(app, db);

app.get('/', (req,res) => {
  res.render('main', {
    //кнопуля логаута
    auth: req.user ? '1' : '0',
  });
})

app.get('/register', (req,res) => {
  res.status(200).render(`register`);
})

app.get('/login', (req,res) => {
  res.status(200).render(`login`);
})

app.get('/admin', (req,res) => {
    res.status(200).render(`admin`);
})


app.listen(port, () => {
  console.log(`server is running on ${port} port`)
})