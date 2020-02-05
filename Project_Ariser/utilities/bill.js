var express = require('express');
var router = express.Router();
let connection = require("../database/databaseconnect");
let lClientList;
let lDrawingList;
let lDrawandCustList;
let iTotalCount;
let lprintBill;

router.get('/bill', async function(req, res){
    await connection.DBConnect();
    lClientList = await connection.GetCustomers();
    lDrawingList = await connection.GetComponent();
    lDrawandCustList = await connection.SelectCustandDraw();
    iBillNumber = await connection.GetMaxBillNumber();
    iTotalCount = await connection.GetTotalQuant();
    await connection.DBClose();

    //console.log(lClientList);
    res.render('bill', {ClientList : lClientList, DrawingList : lDrawingList, DrawandCustList : lDrawandCustList, BillNumber : iBillNumber, TotalCount : iTotalCount, Success : -1});  
});

router.post('/billsave', async function(req, res){
try{

    await connection.DBConnect();
    let dcoperations = [];
    let dcprices = [];
    let dcqty = [];
    for(let index = 0;index < req.body.drawingcode.length;index++)
    {
        dcoperations.push(await connection.GetComponentOperation(req.body.dccompcode));
        dcprices.push(Number(req.body.qty[index]));
        dcqty.push(Number(req.body.price[index]));
    }
    let COperation =await connection.GetComponentOperation(req.body.dccompcode);
    console.log("Print_______________________________________________\n");
    console.log(req.body.dcdate);
    lprintBill = {
        customername: req.body.customername,
        customeraddress1: req.body.customeraddress1,
        customeraddress2: req.body.customeraddress2,
        customercity: req.body.city.split('-')[0],
        customerpin: req.body.city.split('-')[1],
        gstin: req.body.gstin.split(':')[1].trim(),
        invoiceno: req.body.invoiceno,
        invoicedate: req.body.invoicedate,
        dcno: req.body.dcno,
        dccompcode: req.body.dccompcode,
        dcoperation: dcoperations,
        dcquantity: req.body.dcquantity,
        dcdate: req.body.dcdate,
        drawingcode: req.body.drawingcode,
        desc: req.body.desc,
        hsn: req.body.hsn,
        qty: dcqty,
        price: dcprices,
        total: req.body.total,
        sub_total: req.body.sub_total,
        tax_amount: Number(req.body.tax_amount),
        total_amount: Number(req.body.total_amount)
    };
    console.log(lprintBill);
    let InsertSuccess = await connection.InsertBill(req);
    lClientList = await connection.GetCustomers();
    lBillHistory = await connection.GetBills();
    lDCHistory = await connection.GetDC();
    await connection.DBClose();


    res.render('printpage',{BillHistory : lBillHistory, DCHistory : lDCHistory, ClientList : lClientList, printbill : lprintBill, Success : InsertSuccess}); 

}catch (err) 
{
    console.error(err);
}
});

router.post('/getdispatch',async function(req, res){
    await connection.DBConnect();
    console.log("Inside Dispatch_________________________________________________________00");
    lDCCount = await connection.GetDCCounts(req.body);
    await connection.DBClose();
    console.log(lDCCount);
    return res.send(lDCCount);
});

module.exports = router;