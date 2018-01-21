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
    let token = req.headers.authorization.split(' ')[1];
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
  res.sendFile(path.join(`${__dirname}/views/index.html`))
})

// app.get('/register', (req,res) => {
//   res.sendFile(path.join(`${__dirname}/views/signup.html`))
// })

app.get('/login', (req,res) => {
  res.sendFile(path.join(`${__dirname}/views/login.html`))
})

app.listen(port, () => {
  console.log(`server is running on ${port} port`)
})