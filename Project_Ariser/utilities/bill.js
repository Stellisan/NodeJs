var express = require('express');
var router = express.Router();
var connection = require('../database/databaseconnect');

router.use(function(req, res, next){    
});

router.get('/bill', function(req, res){
    var DBConnect = new connection();
    DBConnect.getcustomers();
    res.render('bill');
});

module.exports = router;