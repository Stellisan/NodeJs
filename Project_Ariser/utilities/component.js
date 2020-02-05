var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");

router.get('/component', async function(req, res){
    await connection.DBConnect();
    let lClientList = await connection.GetCustomers();
    Clients = [];
    for(client of lClientList){
        console.log(client[1]);
        Clients.push(client[1]);
    }
    await connection.DBClose();
    console.log(lClientList);
    res.render('component', {ClientList : Clients, Success: -1});
});

router.post('/ComponentInsert', async function(req, res){
    try
    {
        console.log(req.body);
        await connection.DBConnect();
        let lClientList = await connection.GetCustomers();
        Clients = [];
        for(client of lClientList){
            console.log(client[1]);
            Clients.push(client[1]);
        }
        let SuccessInsert = await connection.InsertComponent(req);
        await connection.DBClose();
        res.render('component', {ClientList : Clients, Success: SuccessInsert});
    }
    catch (err)
    {
        console.error(err);
    }

});

module.exports = router;