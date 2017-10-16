const express         = require('express');
const bodyParser      = require('body-parser');
const XMLHttpRequest  = require("xmlhttprequest").XMLHttpRequest;
const path            = require('path');
const routes          = require('./controllers/index.js');
const db              = require('./models/db.js')
const port            = 3000;
const app             = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

routes(app, db);

app.get('/', (req,res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`))
})


app.listen(port, () => {
  console.log(`server is running on ${port} port`)
})