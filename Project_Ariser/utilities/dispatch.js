var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");
let lDrawingList;
let lClientList;

router.get('/dispatch', async function(req, res){
    await connection.DBConnect();
    lDrawandCustList = await connection.SelectCustandDraw();
    lClientList = await connection.GetCustomers();
    await connection.DBClose();
    console.log(lDrawandCustList);
    console.log(lClientList);
    res.render('incoming', {DrawandCustList : lDrawandCustList, ClientList : lClientList, Success: -1});
});

router.post('/dispatchinsert', async function(req, res){
    try{
        console.log("\n Insert Dispatch:\n");
        console.log(req.body);
        await connection.DBConnect();
        lDrawandCustList = await connection.SelectCustandDraw();
        lClientList = await connection.GetCustomers();
        //let SuccessInsert = await connection.InsertDispatch(req);
        let SuccessInsert = await connection.InsertIncoming(req);
        await connection.DBClose();
        //console.log(lDrawandCustList);
        //console.log(lClientList);
        res.render('incoming', {DrawandCustList : lDrawandCustList, ClientList : lClientList, Success : SuccessInsert});
    }
    catch (err)
    {
        console.error(err);
    }

});

module.exports = router;