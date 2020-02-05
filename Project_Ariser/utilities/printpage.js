var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");
let lprintBill;
let lBillHistory;
let lDCHistory=[];
let lBills;
let BillUpdated = 0;
let lClientList;
let dcnos = [];
let dccomppp = [];
let dcquantittt = [];
let dcdates = [];
let drawingcodes = [];
let description = [];
let hsns = [];
let qtities = [];
let rates = [];
let comptotals = [];

router.post('/printpage', async function(req, res){
    console.log("Bill Print _______________________________________________");
    console.log(req.body);
    lDCHistory=[];
    await connection.DBConnect();
    lClientList = await connection.GetCustomersbyname(req.body.customername);
    lBillHistory = await connection.GetBillReltnByBillNo(req.body.inviceno);
    console.log(lBillHistory);
    for(let index = 0;index<lBillHistory.length;index++)
    {
        lDCHistory.push((await connection.GetDCByBillNo(req.body.inviceno,lBillHistory[index][0]))[0]);
    }
    lBills = await connection.GetBillByBillNo(req.body.inviceno);
    // console.log(lClientList);
    // console.log(lDCHistory);
    // console.log(lBillHistory);
    // console.log(lBills);
    
    await connection.DBClose();

    dcnos = [];
    dccomppp = [];
    dcquantittt = [];
    dcoperations = [];
    dcdates = [];
    drawingcodes = [];
    description = [];
    hsns = [];
    qtities = [];
    rates = [];
    comptotals = [];

    console.log(lDCHistory);
    console.log(lDCHistory.length);
    // console.log(lBillHistory);

    for(let index = 0;index<lDCHistory.length;index++)
    {
        dcnos.push(lDCHistory[index][1]);
        dccomppp.push(lDCHistory[index][3]);
        dcquantittt.push(lDCHistory[index][4]);
        console.log(lDCHistory[index][7]);
        let datess = lDCHistory[index][7].split("-");
        datess = datess[0] +"/"+ datess[1]+"/"+datess[2];
        dcdates.push(datess);
    }

    for(let index = 0;index<lBillHistory.length;index++)
    {
        drawingcodes.push(lBillHistory[index][0]);
        await connection.DBConnect();
        dcoperations.push((await connection.GetCompOperations(lBillHistory[index][0]))[0]);
        await connection.DBClose();
        console.log(dcoperations);
        description.push(lBillHistory[index][1]);
        hsns.push(lBillHistory[index][2]);
        qtities.push(lBillHistory[index][4]);
        rates.push(lBillHistory[index][3]);
        comptotals.push(Number(lBillHistory[index][5]).toFixed(2));
    }

    // console.log(lBills[0][1].split('T'));
    let indate = lBills[0][1].split("-");
    indate = indate[2]+"/"+indate[1]+"/"+indate[0];
    // console.log(indate);

    lprintBill = {
        customername: lClientList[0][1],
        customeraddress1: lClientList[0][2],
        customeraddress2: lClientList[0][3],
        customercity: lClientList[0][4],
        customerpin: lClientList[0][5], 
        gstin: lClientList[0][7],
        invoiceno: req.body.inviceno,
        invoicedate: indate,
        dcno: dcnos,
        dccompcode: dccomppp,
        dcoperation:dcoperations,
        dcquantity: dcquantittt,
        dcdate: dcdates,
        drawingcode: drawingcodes,
        desc: description,
        hsn: hsns,
        qty: qtities,
        price: rates,
        total: comptotals,
        sub_total: lBills[0][4].toFixed(2),
        tax_amount: lBills[0][2],
        total_amount: lBills[0][3]
    }

    // console.log("print");
    console.log(lprintBill);

    res.render('printpage',{printbill : lprintBill});
});

router.post('afterprint', async function(req,res){
    try{
    
        await connection.DBConnect();
        lClientList = await connection.GetCustomers();
        lBillHistory = await connection.GetBills();
        lDCHistory = await connection.GetDC();
        await connection.DBClose();
        res.render('bill_history',{BillHistory : lBillHistory, DCHistory : lDCHistory, ClientList : lClientList});

}catch (err) 
{
    console.error(err);
}
});

module.exports = router;