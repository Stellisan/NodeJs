var express = require('express');
var app = express();
var home = require('./utilities/home');
var bill = require('./utilities/bill');
var dbConfig = require('./database/dbconfig');
var string = require('./utilities/string');
var parser = require('body-parser');
var path = require('path');

const port = 3000;


app.use(function(req,res,next){
  res.locals.userValue = null
  next()
  });
  
app.use(parser.json())
.use(parser.urlencoded({
  extended: true
}));

app.set('view engine','ejs');
app.use('/public', express.static(__dirname + '/public'));

app.use('/pages',home);
app.use('/pages',bill);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))