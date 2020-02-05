var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");

router.get('/customer', async function(req, res){
    res.render('customer',{Success : -1});
});

router.post('/clientinsert', async function(req, res){
    try{
        //console.log(req.body);
        await connection.DBConnect();
        let InsertSuccess = await connection.InsertClient(req);
        await connection.DBClose();

        res.render('customer',{Success : InsertSuccess});
    }
    catch (err)
    {
        console.error(err);
    }

});
    
module.exports = router;