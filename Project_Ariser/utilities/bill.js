var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");

router.get('/bill', async function(req, res){
    let lClientList = await connection.DBConnect();
    console.log(lClientList);
    res.render('bill', {ClientList : lClientList});
});

module.exports = router;