var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");
let lBillHistory;
let lDCHistory;
let BillUpdated = 0;
let lClientList;

router.get('/incomingquery', async function(req, res){
 
try{

    await connection.DBConnect();
    lClientList = await connection.GetCustomers();
    lBillHistory = await connection.GetBills();
    lDCHistory = await connection.GetDC();
    lDC = await connection.GetDCHistory();
    await connection.DBClose();
    res.render('incomingquery',{BillHistory : lBillHistory, DCHistory : lDCHistory, ClientList : lClientList, DC : lDC});

}catch (err) 
{
    console.error(err);
}
});

// router.post('/updatebill',async function(req, res){
//     console.log(req.body);
//     await connection.DBConnect();
//     BillUpdated = await connection.UpdateBill(req.body);
//     await connection.DBClose();
//     BillUpdated = [BillUpdated];
//     return res.send(BillUpdated);
// });

module.exports = router;