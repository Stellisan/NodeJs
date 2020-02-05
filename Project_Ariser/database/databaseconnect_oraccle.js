"use strict";
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');
    
let connection = null;

module.exports.DBConnect = async function()
{
  try{        
    connection = await oracledb.getConnection(  {
    user          : "system",
    password      : "admin",
    connectString : "localhost:1521/xe"
    });
    }catch (err) {
    console.error(err);
    }
};

module.exports.GetCustomers = async function() 
   {
    try 
    {
        let result = await connection.execute(string.s_selectcustomer);
        return(result.rows);
  } catch (err) {
    console.error(err);
  }
}

module.exports.GetCustomersbyname = async function(name) 
   {
    try 
    {
        let result = await connection.execute("select * from ASDB_CUSTOMER ac where ac.C_NAME ='"+name+"'");
        return(result.rows);
  } catch (err) {
    console.error(err);
  }
}

module.exports.GetDCByBillNo = async function(billno) 
   {
    try 
    {
        let result = await connection.execute("select abdr.BD_RELTN_NO, abdr.DC_NO, abdr.BILL_NO, abdr.DRAWING_NO, abdr.QUANTITY, abdr.TOTAL, ad.DC_NO, to_char(ad.DC_DATE, 'D-MM-YYYY') as DCDATE, ad.DRAWING_NO, ad.PHY_QUAN, ad.REC_QUAN from ASDB_BILL_DISPATCH_RELTN abdr, ASDB_DISPATCH ad where abdr.BILL_NO = "+billno+" and abdr.DC_NO = ad.DC_NO");
        return(result.rows);
  } catch (err) {
    console.error(err);
  }
}

module.exports.GetBillReltnByBillNo = async function(billno) 
   {
    try 
    {
        let result = await connection.execute("select abdr.DRAWING_NO, ac.CO_DESCRIPTION, ac.CO_HSN, ac.CO_PRICE_PIECE, sum(abdr.QUANTITY), sum(abdr.TOTAL)  from ASDB_BILL_DISPATCH_RELTN abdr, ASDB_COMPONENT ac where abdr.BILL_NO = "+billno+" and ac.DRAWING_NO = abdr.DRAWING_NO group by abdr.DRAWING_NO, ac.CO_DESCRIPTION, ac.CO_HSN, ac.CO_PRICE_PIECE");
        return(result.rows);
  } catch (err) {
    console.error(err);
  }
}

module.exports.GetBillByBillNo = async function(billno) 
   {
    try 
    {
        let result = await connection.execute("select ab.BILL_NO,to_char(ab.B_DATE, 'D-MM-YYYY'),ab.B_GST,ab.B_TOTAL_PRICE,ab.B_SUB_TOTAL,ab.PAYMENT_RECIEVED from ASDB_BILL ab where ab.BILL_NO ="+billno);
        return(result.rows);
  } catch (err) {
    console.error(err);
  }
}

module.exports.GetComponent = async function()
{
  try 
  {
      let result = await connection.execute(string.s_selectdrawing);
      return(result.rows);
  }
  catch (err) {
  console.error(err);
  }
}

module.exports.InsertClient = async function(req)
{
  try
  {
    //For inserting
    var myDate = new Date(2019,9,12);
    let result = await connection.execute("SELECT max(ac.C_ID) from ASDB_CUSTOMER ac");
    let iMaxCustID = result.rows[0][0];
    iMaxCustID++;
    console.log(req.body.CName);
    console.log(req.body.AddressOne);
    console.log(req.body.AddressTwo);
    console.log(req.body.City);
    console.log(req.body.Pincode);
    console.log(req.body.Phoneno);
    console.log(req.body.gstin);
    const sqlQuery = `INSERT INTO ASDB_CUSTOMER (C_ID, C_NAME, C_ADDRESS_ONE, C_ADDRESS_TWO, C_CITY, C_PINCODE, C_PHONE_NO, C_GSTIN) VALUES (:0, :1, :2, :3, :4, :5, :6, :7)`;
    let binds = [[iMaxCustID,req.body.CName,req.body.AddressOne,req.body.AddressTwo,req.body.City,req.body.Pincode,req.body.Phoneno,req.body.gstin]];
    result = await connection.executeMany(sqlQuery, binds, {autoCommit: true});
    console.log("Number of inserted rows:", result.rowsAffected);
  }
  catch (err) {
    console.error(err);
  }
}

module.exports.InsertComponent = async function(req)
{
  try
  {
    var myDate = new Date(2019,9,12);
    console.log(req.body.Drawingno);
    let result = await connection.execute("SELECT ac.C_ID from ASDB_CUSTOMER ac where ac.C_NAME = '"+req.body.customer+"'");
    console.log(result);
    let iCustID = result.rows[0][0];
    console.log(req.body.customer);
    console.log(iCustID);
    console.log(req.body.Description);
    console.log(req.body.operation);
    console.log(req.body.pricepiece);
    const sqlQuery = `INSERT INTO ASDB_COMPONENT (DRAWING_NO, C_ID, CO_DESCRIPTION, CO_OPERATION, CO_PRICE_PIECE) VALUES (:0, :1, :2, :3, :4)`;
    let binds = [[req.body.Drawingno,iCustID,req.body.Description,req.body.operation,req.body.pricepiece]];
    result = await connection.executeMany(sqlQuery, binds, {autoCommit: true});
    console.log("Number of inserted rows:", result.rowsAffected);
  }
  catch (err) {
    console.error(err);
  }
}

module.exports.InsertDispatch = async function(req)
{ 
  try
  {
    console.log(req.body.DCNo);
    console.log(req.body.DCDate);
    console.log(req.body.Drawingno);
    console.log(req.body.RecievedQnt);

    var Datestring = req.body.DCDate.split("/");//new Date(2019,9,12);
    var DispatchDate = new Date(Number(Datestring[2]),Number(Datestring[1]),Number(Datestring[0]));
    const sqlQuery = `INSERT INTO ASDB_DISPATCH (DC_NO, DC_DATE, DRAWING_NO, PHY_QUAN, REC_QUAN) VALUES (:0, :1, :2, :3, :4)`;
    let binds = [[req.body.DCNo,DispatchDate,req.body.Drawingno,req.body.RecievedQnt,req.body.RecievedQnt]];
    let result = await connection.executeMany(sqlQuery, binds, {autoCommit: true});
    console.log("Number of inserted rows:", result.rowsAffected);
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.InsertBill = async function(req)
{ 
  try
  {
    console.log(req.body);
    console.log(req.body.invoiceno);

    let con = connection;

    var Datestring = req.body.invoicedate.split("-");
    var BillDate = new Date(Number(Datestring[2]),Number(Datestring[1]),Number(Datestring[0]));

    let drawingNumbers = req.body.drawingcode;

    const sqlQuery = `INSERT INTO ASDB_BILL (BILL_NO, B_DATE, B_GST, B_TOTAL_PRICE, B_SUB_TOTAL,PAYMENT_RECIEVED) VALUES (:0, :1, :2, :3, :4, :5)`;
    let binds = [[req.body.invoiceno,BillDate,req.body.tax_amount,req.body.total_amount,req.body.sub_total,0]];
    let resultinsert = await connection.executeMany(sqlQuery, binds, {autoCommit: true});
    console.log("Number of inserted rows:", resultinsert.rowsAffected);

    for(var index = 0; index < drawingNumbers.length; index++)
    {
      let result = await con.execute("select * from ASV_LATESTCOMP al where al.DRAWING_NO = '"+drawingNumbers[index]+"' and al.DC_DATE =(select MIN(alki.DC_DATE) from ASV_LATESTCOMP alki where alki.DRAWING_NO = '"+drawingNumbers[index]+"')");      
      console.log(result);
      console.log(result.rows[0][3]);
      let updated_quantity = result.rows[0][3] - req.body.qty[index];
      console.log(updated_quantity);
      console.log("Dispatch: "+result.rows[0][0]+" Rec Quantity: "+updated_quantity);
      
      while(updated_quantity < 0)
      {
          let resultbillreltn = await connection.execute("SELECT max(abr.BD_RELTN_NO) from ASDB_BILL_DISPATCH_RELTN abr");
          let iMaxBILLReltnID = resultbillreltn.rows[0][0];
          iMaxBILLReltnID++;

          let totalamount = result.rows[0][3] * req.body.price[index];
          
          const sqlQuery = `INSERT INTO ASDB_BILL_DISPATCH_RELTN (BD_RELTN_NO, DC_NO, BILL_NO, DRAWING_NO, QUANTITY, TOTAL) VALUES (:0, :1, :2, :3, :4, :5)`;
          let binds = [[iMaxBILLReltnID,result.rows[0][0],req.body.invoiceno,drawingNumbers[index],result.rows[0][3],totalamount]];
          let resultinsert = await connection.executeMany(sqlQuery, binds, {autoCommit: true});
          console.log("Number of inserted rows:", resultinsert.rowsAffected);

          console.log("update ASDB_DISPATCH ad set ad.PHY_QUAN = :1 where ad.DC_NO = :2");
          let resultupdated = await connection.execute("update ASDB_DISPATCH ad set ad.PHY_QUAN = 0 where ad.DC_NO = :1",[result.rows[0][0]],{autoCommit: true});
          result = await connection.execute("select * from ASV_LATESTCOMP al where al.DRAWING_NO = '"+drawingNumbers[index]+"' and al.DC_DATE =(select MIN(alki.DC_DATE) from ASV_LATESTCOMP alki where alki.DRAWING_NO = '"+drawingNumbers[index]+"')");

          updated_quantity = result.rows[0][3] + updated_quantity;
      }

      let resultbillreltn = await connection.execute("SELECT max(abr.BD_RELTN_NO) from ASDB_BILL_DISPATCH_RELTN abr");
      let iMaxBILLReltnID = resultbillreltn.rows[0][0];
      iMaxBILLReltnID++;

      let quantitycalculated = result.rows[0][3] - updated_quantity;
      let subcostforpro = quantitycalculated * req.body.price[index];

      const sqlInsertBillRelltn = `INSERT INTO ASDB_BILL_DISPATCH_RELTN (BD_RELTN_NO, DC_NO, BILL_NO, DRAWING_NO, QUANTITY, TOTAL) VALUES (:0, :1, :2, :3, :4, :5)`;
      binds = [[iMaxBILLReltnID,result.rows[0][0],req.body.invoiceno,drawingNumbers[index],quantitycalculated,subcostforpro]];
      resultinsert = await connection.executeMany(sqlInsertBillRelltn, binds, {autoCommit: true});
      console.log("Number of inserted rows:", resultinsert.rowsAffected);

      console.log("update ASDB_DISPATCH ad set ad.PHY_QUAN = :1 where ad.DC_NO = :2");
      let resultupdated = await connection.execute("update ASDB_DISPATCH ad set ad.PHY_QUAN = :1 where ad.DC_NO = :2",[updated_quantity,result.rows[0][0]],{autoCommit: true});
      console.log("Number of updated rows:", resultupdated.rowsAffected);
    }
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.SelectCustandDraw = async function(req)
{
  try
  {
    let result = await connection.execute(string.s_selectcustanddraw);
    return(result.rows);
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.GetTotalQuant = async function()
{
  try
  {
    let result = await connection.execute("select * from ASV_PHYQUANT");
    return(result.rows);
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.GetMaxBillNumber = async function()
{
  try
  {
    let result = await connection.execute("SELECT max(ab.BILL_NO) from ASDB_BILL ab");
    let iBillID = result.rows[0][0];
    iBillID++;
    return iBillID;
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.GetDC = async function()
{
  try
  {
    let result = await connection.execute("select asb.BILL_NO,ad.DC_NO,aco.DRAWING_NO,aco.CO_DESCRIPTION,abr.QUANTITY,abr.TOTAL from ASDB_BILL asb, ASDB_BILL_DISPATCH_RELTN abr, ASDB_DISPATCH ad, ASDB_CUSTOMER ac, ASDB_COMPONENT aco where asb.BILL_NO = abr.BILL_NO and ad.DC_NO = abr.DC_NO and aco.DRAWING_NO = abr.DRAWING_NO and aco.C_ID = ac.C_ID order by asb.BILL_NO ASC");
    return result.rows;
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.GetDCHistory = async function()
{
  try
  {
    let result = await connection.execute("select ad.DC_NO, ad.DC_DATE, ac.C_NAME, aco.DRAWING_NO, aco.CO_DESCRIPTION, ad.PHY_QUAN, ad.REC_QUAN from ASDB_DISPATCH ad, ASDB_COMPONENT aco, ASDB_CUSTOMER ac where ad.drawing_no = aco.drawing_no and aco.c_id = ac.c_id");
    return result.rows;
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.GetBills = async function()
{
  try
  {
    let result = await connection.execute("select distinct ab.BILL_NO,ac.C_NAME,ab.B_DATE,ab.B_GST,ab.B_TOTAL_PRICE,ab.PAYMENT_RECIEVED from ASDB_BILL ab,ASDB_BILL_DISPATCH_RELTN abdr,ASDB_CUSTOMER ac,ASDB_COMPONENT aco where ab.BILL_NO = abdr.BILL_NO and aco.DRAWING_NO = abdr.DRAWING_NO and aco.C_ID = ac.C_ID order by ab.BILL_NO ASC");
    return result.rows;
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.DBClose = async function()
{
   if (connection) {
    try {
        connection.close();
    } catch (err) {
        console.error(err);
     }
  }
}

module.exports.GetDCCounts = async function(billlist)
{
  let incominglist = [];

  for(var index = 0; index < billlist.components.length; index++)
    {
      let result = await connection.execute("select * from ASV_LATESTCOMP al where al.DRAWING_NO = '"+billlist.components[index]+"' order by al.DC_DATE ASC");
      let billindex = 0;
      let updated_quantity = result.rows[billindex][3] - billlist.quantity[index];
      
      while(updated_quantity < 0)
      {
        incominglist.push([result.rows[billindex][0],result.rows[billindex][1],result.rows[billindex][2],result.rows[billindex][3]]);
        billindex++;
        updated_quantity = result.rows[billindex][3] + updated_quantity;
      }
      
      let quantitycalculated = result.rows[billindex][3] - updated_quantity;
      incominglist.push([result.rows[billindex][0],result.rows[billindex][1],result.rows[billindex][2],quantitycalculated]);
      updated_quantity = result.rows[0][3] + updated_quantity;
    }
    return incominglist;

}

module.exports.UpdateBill = async function(billdetail)
{
  let status = 0;
  if(billdetail.statuss == "close")
    status = 1;

  let resultupdated = await connection.execute("update ASDB_BILL ab set ab.PAYMENT_RECIEVED = :1 where ab.BILL_NO = :2",[status,billdetail.billnumber],{autoCommit: true});
  
  if(resultupdated.rowsAffected>0)
    return 1;
  else
    return 0;
}

module.exports.HSNReport = async function()
{
  try
  {
    let result = await connection.execute("SELECT * FROM ASV_HSNTOTALSUM");
    console.log(result.rows);
    return(result.rows);
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.BillReport = async function()
{
  try
  {
    let result = await connection.execute("SELECT * FROM ASV_BILLBYMONTH");
    console.log(result.rows);
    return(result.rows);
  }
  catch(err)
  {
    console.error(err);
  }
}