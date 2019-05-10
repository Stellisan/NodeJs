var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");

router.get('/bill', async function(req, res){
    await connection.DBConnect();
    let lClientList = await connection.GetCustomers();
    
    await connection.DBClose();
    console.log(lClientList);
    res.render('bill', {ClientList : lClientList});
});

router.post('/save', async function(req, res){
    await connection.DBConnect();
    await connection.InsertClient();
    await connection.DBClose();
});

module.exports = router;