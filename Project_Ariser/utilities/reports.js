var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");
let lClientList;
let lDrawingList;
let lDrawandCustList;
let iTotalCount;

router.get('/reports', async function(req, res){
    await connection.DBConnect();
    lClientList = await connection.GetCustomers();
    lBillHistory = await connection.GetBills();
    lHSNReport = await connection.HSNReport();
    lBillReport = await connection.BillReport();
    await connection.DBClose();
    console.log(lBillReport);
    //console.log(lClientList);
    res.render('reports', {BillHistory : lBillHistory, HSN : lHSNReport, ClientList : lClientList, BillReport : lBillReport});
});

// router.post('/billsave', async function(req, res){
// try{

//     await connection.DBConnect();
//     await connection.InsertBill(req);
//     lClientList = await connection.GetCustomers();
//     lBillHistory = await connection.GetBills();
//     lDCHistory = await connection.GetDC();
//     await connection.DBClose();

//     res.render('bill_history',{BillHistory : lBillHistory, DCHistory : lDCHistory, ClientList : lClientList}); 

// }catch (err) 
// {
//     console.error(err);
// }
// });

// router.post('/getdispatch',async function(req, res){
//     await connection.DBConnect();
//     lDCCount = await connection.GetDCCounts(req.body);
//     await connection.DBClose();
//     return res.send(lDCCount);
// });

module.exports = router;