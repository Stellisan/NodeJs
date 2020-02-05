var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");
let lDrawingList;

router.get('/dispatch', async function(req, res){
    await connection.DBConnect();
    lDrawingList = await connection.GetComponent();
    await connection.DBClose();
    console.log(lDrawingList);
    res.render('dispatch', {DrawingList : lDrawingList, Success: -1});
});

router.post('/dispatchinsert', async function(req, res){
    try{
        await connection.DBConnect();
        lDrawingList = await connection.GetComponent();
        let SuccessInsert = await connection.InsertDispatch(req);
        await connection.DBClose();
        console.log(lDrawingList);
        res.render('dispatch', {DrawingList : lDrawingList, Success : SuccessInsert});
    }
    catch (err)
    {
        console.error(err);
    }

});

module.exports = router;