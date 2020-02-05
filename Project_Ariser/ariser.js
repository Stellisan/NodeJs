var express = require('express');
var app = express();
var dbConfig = require('./database/dbconfig');
var string = require('./utilities/string');
var parser = require('body-parser');
var path = require('path');

const port = 3000;

var home = require('./utilities/home');
var bill = require('./utilities/bill');
var customer = require('./utilities/customer');
var component = require('./utilities/component');
var dispatch = require('./utilities/dispatch');
var billhistory = require('./utilities/billhistory');
var incomingquery = require('./utilities/incomingquery');
var reports = require('./utilities/reports');
var printpage = require('./utilities/printpage');

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
app.use('/pages',customer);
app.use('/pages',component);
app.use('/pages',dispatch);
app.use('/pages',billhistory);
app.use('/pages',incomingquery);
app.use('/pages',reports);
app.use('/pages',printpage);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))