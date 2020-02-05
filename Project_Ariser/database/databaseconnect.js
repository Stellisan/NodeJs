"use strict";
var mysql = require('mysql');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');
var Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Datatypes = Sequelize.DataTypes;

//Data Models files
const bill = require('../modal/asdb_bill');
const customer = require('../modal/asdb_customer');
const dispatch = require('../modal/asdb_dispatch');
const component = require('../modal/asdb_component');
const dcbilljoin = require('../modal/asv_dc_bill_join');
const billbymonth = require('../modal/asv_billbymonth');
const billdispatchreltn = require('../modal/asdb_bill_dispatch_reltn');
const purchaseorder = require('../modal/asdb_purchaseorder');
const hsntotal = require('../modal/asv_hsntotalsum');
const latestcomp = require('../modal/asv_latestcomp');
const physicalqnt = require('../modal/asv_phyquant');
const maxcust = require('../modal/asv_max_cust_no');
const mindatecomp = require('../modal/asv_min_date_comp');
const maxbillresult = require('../modal/asv_max_bd_reltn_no');
const maxbillnumber = require('../modal/asv_max_bill_no');
const asvcompcust = require('../modal/asv_comp_cust');
const asvdcnumber = require('../modal/asv_dc_number');
const asvbillhistory = require('../modal/asv_bill_history');
const asvdchistory = require('../modal/asv_dc_history');
const asvbilldcreltnbillno = require('../modal/asv_bill_dc_reltn_billno');
const asvcompoperations = require('../modal/asv_comp_operations');

//local varaibles
let sequelize = null;

//Data Models
let CustModal = null;
let BillModal = null;
let DispatchModal = null;
let ComponentModal = null;
let BillDCJoin = null;
let BillByMonth = null;
let BillDispatchrel = null;
let PurchaseOrders = null;
let HsnTotals = null;
let LatestComps = null;
let PhysicalQuantity = null;
let MaxCustomerNo = null;
let MinDateCompDC = null;
let MaxBillDCResltn = null;
let MaxBillno = null;
let AsvCompCustom = null;
let AsvDCNumber = null;
let BillHistory = null;
let DCHistory = null;
let BillDCReltn = null;
let CompOperations = null;

function formateedit(objarr)
{
  let finalresult = [];
  for(let i = 0; i < objarr.length; i++)
  {
      finalresult.push(Object.keys(objarr[i]).map(function(key){
          return(objarr[i][key]);
      }));
  }
  return finalresult;
}

module.exports.DBConnect = async function()
{
    sequelize = new Sequelize('ariserdb',dbConfig.mysqlusername,dbConfig.mysqlpassword,{
      host:dbConfig.mysqlconnectString,
      dialect: "mysql",
      port: 3306,
      define: {
        timestamps: false,
        underscore: true
      }
  });

    CustModal = customer(sequelize,Datatypes);
    BillModal = bill(sequelize,Datatypes);
    DispatchModal = dispatch(sequelize,Datatypes);
    ComponentModal = component(sequelize,Datatypes);
    BillDCJoin = dcbilljoin(sequelize,Datatypes);
    BillByMonth = billbymonth(sequelize,Datatypes);
    BillDispatchrel = billdispatchreltn(sequelize,Datatypes);
    PurchaseOrders = purchaseorder(sequelize,Datatypes);
    HsnTotals = hsntotal(sequelize,Datatypes);
    LatestComps = latestcomp(sequelize,Datatypes);
    PhysicalQuantity = physicalqnt(sequelize,Datatypes);
    MaxCustomerNo = maxcust(sequelize,Datatypes);
    MinDateCompDC = mindatecomp(sequelize,Datatypes);
    MaxBillDCResltn = maxbillresult(sequelize,Datatypes);
    MaxBillno = maxbillnumber(sequelize,Datatypes);
    AsvCompCustom = asvcompcust(sequelize,Datatypes);
    AsvDCNumber = asvdcnumber(sequelize,Datatypes);
    BillHistory = asvbillhistory(sequelize,Datatypes);
    DCHistory = asvdchistory(sequelize,Datatypes);
    BillDCReltn = asvbilldcreltnbillno(sequelize,Datatypes);
    CompOperations = asvcompoperations(sequelize,Datatypes);
}

module.exports.GetCustomers = async function() 
{
  try 
    {
        let result = await CustModal.findAll({raw:true});
        return(formateedit(result));
    } catch (err) {
      console.error(err);
    }
}

module.exports.GetCustomersbyname = async function(name){
  try 
    {
        let result = await CustModal.findAll({
          where:{
            C_NAME: name
          },
          raw:true
        })
        return(formateedit(result));
    } catch (err) {
      console.error(err);
    }
}

module.exports.GetDCByBillNo = async function(billno,drawingno) 
   {
    try 
    {
        let result = await BillDCJoin.findAll({
          where:{
            BILL_NO:billno,
            DCDRAWINGNO:drawingno,
            DRAWING_NO:drawingno,
          },
          raw:true,
          attributes:['BD_RELTN_NO','DC_NO','BILL_NO','DRAWING_NO','QUANTITY','TOTAL','DCDCNO','DCDATE','DCDRAWINGNO','PHY_QUAN','REC_QUAN']
          });

        result = (formateedit(result));
        return result;
  } catch (err) {
    console.error(err);
  }
}

module.exports.GetBillReltnByBillNo = async function(billno) 
   {
    try 
    {
        let result = await BillDCReltn.findAll({
          where:{
            BILL_NO:billno
          },
          raw:true,
        attributes:['DRAWING_NO','CO_DESCRIPTION','CO_HSN','QUANTITY','CO_PRICE_PIECE','TOTAL']
          });

        return (formateedit(result));
  } catch (err) {
    console.error(err);
  }
}

//GetBillByBillNo
module.exports.GetBillByBillNo = async function(billno) 
   {
    try 
    {
      let result = await BillModal.findAll({
        where:{
          BILL_NO: billno
        },
        raw:true
      })
      return(formateedit(result));
  } catch (err) {
    console.error(err);
  }
}

//GetComponent
module.exports.GetComponent = async function() 
   {
    try 
    {
      let result = await ComponentModal.findAll({
        raw:true,
        attributes:['DRAWING_NO','C_ID']
      })
      return(formateedit(result));
  } catch (err) {
    console.error(err);
  }
}

async function InsertClient(req)
{
  try
  {
    let customerno = await MaxCustomerNo.findAll({
      raw: true,
      attributes:['MAX_NO']
    })
    
    customerno = formateedit(customerno);
    
    let result = await CustModal.create({
      C_ID: customerno[0][0]+1,
      C_NAME: req.body.CName,
      C_ADDRESS_ONE: req.body.AddressOne,
      C_ADDRESS_TWO: req.body.AddressTwo,
      C_CITY: req.body.City,
      C_PINCODE: req.body.Pincode,
      C_PHONE_NO: req.body.Phoneno,
      C_GSTIN: req.body.gstin
    })
    
    let customernumber = formateedit(await MaxCustomerNo.findAll({
      raw: true,
      attributes:['MAX_NO']
    }));

    if(customerno[0][0] < customernumber[0][0])
      return 1;
    else
      return 0;

    } catch (err) {
    console.error(err);
    return 0;
  }
}

//InsertComponent
async function InsertComponent(req)
{
  try
  {
    var myDate = new Date(2019,9,12);
    console.log(req.body.Drawingno);

    let result = await CustModal.findAll({
      where: {
        C_NAME: req.body.customer
      },
      raw: true
    })
    result = formateedit(result);

    console.log(result);
    let iCustID = result[0][0];
    console.log(req.body.customer);
    console.log(iCustID);
    console.log(req.body.Description);
    console.log(req.body.operation);
    console.log(req.body.pricepiece);

    
      result = await ComponentModal.create({
      DRAWING_NO: req.body.Drawingno,
      C_ID: iCustID,
      CO_DESCRIPTION: req.body.Description,
      CO_OPERATION: req.body.operation,
      CO_PRICE_PIECE: req.body.pricepiece,
      CO_HSN: req.body.hsnnumber
    })
    
    return 1;

    } catch (err) {
    console.error(err);
    return 0;
  }
}

async function InsertDispatch(req)
{
  try
  {
    var Datestring = req.body.DCDate.split("-");//new Date(2019,9,12);
    var DispatchDate = new Date(Number(Datestring[2]),Number(Datestring[1])-1,Number(Datestring[0])+1);
    console.log("Date required:   ");
    console.log(Datestring);
    console.log(DispatchDate);
    let result = await DispatchModal.create({
      DC_NO: req.body.DCNo,
      DC_DATE: DispatchDate,
      DRAWING_NO: req.body.Drawingno,
      PHY_QUAN: req.body.RecievedQnt,
      REC_QUAN: req.body.RecievedQnt,
      RATE_PIECE: req.body.Price
    });

    return 1;

    } catch (err) {
    console.error(err);
    return 0;
  }
}

//InserBill
module.exports.InsertBill = async function(req)
{
  try
  {
    console.log(req.body);
    console.log(req.body.invoiceno);

    var Datestring = req.body.invoicedate.split("-");
    var BillDate = new Date(Number(Datestring[2]),Number(Datestring[1])-1,Number(Datestring[0]));

    let drawingNumbers = req.body.drawingcode;

    let result = await BillModal.create({
      BILL_NO: req.body.invoiceno,
      B_DATE: BillDate,
      B_GST: req.body.tax_amount,
      B_TOTAL_PRICE: req.body.total_amount,
      B_SUB_TOTAL: req.body.sub_total,
      PAYMENT_RECIEVED: 0
    })

    result = formateedit(result);

    for(var index = 0; index < drawingNumbers.length; index++)
    {
      let result = await MinDateCompDC.findAll({
        where:{
          DRAWING_NO: drawingNumbers[index]
        },
        raw: true,
        attributes: ['MIN_DATE','DRAWING_NO']
      })

      result = formateedit(result);

      result = await LatestComps.findAll({
        where:{
          DRAWING_NO: drawingNumbers[index],
          DC_DATE: result[0][0]
        },
        raw: true,
        attributes: ['DC_NO','DC_DATE','DRAWING_NO','PHY_QUAN','REC_QUAN']
      })
      result = formateedit(result);
      console.log(result);
      let updated_quantity = result[0][3] - req.body.qty[index];
      console.log(updated_quantity);
      console.log("Dispatch: "+result[0][0]+" Rec Quantity: "+updated_quantity);
      
      while(updated_quantity < 0)
      {
          let resultbillreltn = await MaxBillno.findAll({
            raw: true,
            attributes: ['MAX_NO']
          })

          resultbillreltn = formateedit(resultbillreltn);

          let iMaxBILLReltnID = resultbillreltn[0][0];
          iMaxBILLReltnID++;

          let totalamount = result[0][3] * req.body.price[index];
          
          let result = await BillDispatchrel.create({
            BD_RELTN_NO: iMaxBILLReltnID,
            DC_NO: result[0][0],
            BILL_NO: req.body.invoiceno,
            DRAWING_NO: drawingNumbers[index],
            QUANTITY: result[0][3],
            TOTAL: totalamount
          })

          result = formateedit(result);

          let resultupdated = await DispatchModal.update({
            PHY_QUAN: 0
          },{
            where:{
              DC_NO: result[0][0]
            }
          })

          result = await MinDateCompDC.findAll({
            where:{
              DRAWING_NO: drawingNumbers[index]
            },
            raw: true,
            attributes: ['MIN_DATE','DRAWING_NO']
          })
    
          result = formateedit(result);

          result = await LatestComps.findAll({
            where:{
              DRAWING_NO: drawingNumbers[index],
              DC_DATE: result[0][0]
            },
            raw: true,
            attributes: ['DC_NO','DC_DATE','DRAWING_NO','PHY_QUAN','REC_QUAN']
          })

          result = formateedit(result);

          updated_quantity = result[0][3] + updated_quantity;
      }

      let resultbillreltn = await MaxBillDCResltn.findAll({
        raw: true,
        attributes: ['MAX_NO']
      })

      resultbillreltn = formateedit(resultbillreltn);

      let iMaxBILLReltnID = resultbillreltn[0][0];
      iMaxBILLReltnID++;

      let quantitycalculated = result[0][3] - updated_quantity;
      let subcostforpro = quantitycalculated * req.body.price[index];

      await BillDispatchrel.create({
        BD_RELTN_NO: iMaxBILLReltnID,
        DC_NO: result[0][0],
        BILL_NO: req.body.invoiceno,
        DRAWING_NO: drawingNumbers[index],
        QUANTITY: quantitycalculated,
        TOTAL: subcostforpro
      })

      let resultupdated = await DispatchModal.update({
        PHY_QUAN: updated_quantity
      },{
        where:{
          DC_NO: result[0][0]
        }
      })

      resultupdated = formateedit(resultupdated);

      console.log("Number of updated rows:", resultupdated.rowsAffected);
    }

    return 1;


  } catch (err) {
    console.error(err);
    return 0;
  }
}

module.exports.SelectCustandDraw = async function(req)
{
  try
  {
    let result = await AsvCompCustom.findAll({
      raw: true,
      attributes: ['DRAWING_NO','CO_DESCRIPTION','C_NAME','CO_PRICE_PIECE','CO_HSN','CO_OPERATION']
    })
    console.log(formateedit(result));
    return(formateedit(result));
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
    let result = await PhysicalQuantity.findAll({
      raw: true,
      attributes: ['C_ID','DRAWING_NO','TOTAL_QUAN']
    })
    return(formateedit(result));
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
    let result = await MaxBillno.findAll({
      raw: true,
      attributes: ['MAX_NO']
    })
    result = formateedit(result);   
    let iBillID = result[0][0];
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
    let result = await AsvDCNumber.findAll({
      raw: true,
      attributes: ['BILL_NO','DC_NO','DRAWING_NO','CO_DESCRIPTION','QUANTITY','TOTAL']
    })
   
    return(formateedit(result));
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
    let result = await DCHistory.findAll({
      raw: true,
      attributes: ['DC_NO','DC_DATE','C_NAME','DRAWING_NO','CO_DESCRIPTION','PHY_QUAN','REC_QUAN']
    })
    return(formateedit(result));
  }
  catch(err)
  {
    console.error(err);
  }
}

module.exports.GetBills = async function()
{
  try{
    let result = await BillHistory.findAll({
      raw: true,
      attributes: ['BILL_NO','C_NAME','B_DATE','B_GST','B_TOTAL_PRICE','PAYMENT_RECIEVED']
    })
    return(formateedit(result));
  } catch(err)
  {
    console.error(err);
  }
}

module.exports.HSNReport = async function()
{
  try
  {
    let result = await HsnTotals.findAll({
      raw:true,
      attributes: ['HSN','QUANTITY','TOTAL','BDATE']
    })
    return(formateedit(result));
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
    let result = await BillByMonth.findAll({
      raw:true,
      attributes: ['BILL_NO','C_NAME','B_SUB_TOTAL','B_GST','B_TOTAL_PRICE','BDATE']
    })
    return(formateedit(result));
  }
  catch(err)
  {
    console.error(err);
  }
}

//module.exports.GetDCCounts = async function(billlist)
module.exports.GetDCCounts = async function(billlist)
{
  let incominglist = [];
  console.log("______________________________________");
  console.log(billlist);
  console.log("______________________________________");
  for(var index = 0; index < billlist.components.length; index++)
    {
      let result = await LatestComps.findAll({
        where: {
          DRAWING_NO: billlist.components[index]
        },
        order: ['DC_DATE'],
        attributes: ['DC_NO','DC_DATE','DRAWING_NO','PHY_QUAN','REC_QUAN'],
        raw: true
      })
      result = formateedit(result);
      
      let billindex = 0;
      let updated_quantity = result[billindex][3] - billlist.quantity[index];
      
      while(updated_quantity < 0)
      {
        incominglist.push([result[billindex][0],result[billindex][1],result[billindex][2],result[billindex][3]]);
        billindex++;
        updated_quantity = result[billindex][3] + updated_quantity;
      }
      
      let quantitycalculated = result[billindex][3] - updated_quantity;
      incominglist.push([result[billindex][0],result[billindex][1],result[billindex][2],quantitycalculated]);
      updated_quantity = result[0][3] + updated_quantity;
    }
    return incominglist;
}

module.exports.UpdateBill = async function(billdetail)
{
  let status = 0;
  if(billdetail.statuss == "close")
    status = 1;

  let resultupdated = await BillModal.update({
    PAYMENT_RECIEVED: status,
  },
  { where: {
       BILL_NO: billdetail.billnumber
    }
   })
  
  console.log(resultupdated);

  if(resultupdated[0]>0)
    return 1;
  else
    return 0;
}

module.exports.GetCompOperations = async function(drawingnumber){
  try 
    {
        let result = await CompOperations.findAll({
          where:{
            DRAWING_NO: drawingnumber
          },
          attributes: ["CO_OPERATION"],
          raw:true
        })
        return(formateedit(result));
    } catch (err) {
      console.error(err);
    }
}

async function checkClient(name)
{
  try{
    let result = await CustModal.findAll({
      where:{
        C_NAME: name
    },
      raw:true
    })
    if(formateedit(result).length != 0)
      return 1;
    else
      return 0;

  } catch(err){
    console.error(err);
  }
}

async function checkComponent(code)
{
  try 
  {
    let result = await ComponentModal.findAll({
    raw:true,
    where:{
      DRAWING_NO: code
  }
  })
  console.log(formateedit(result).length);
  if(formateedit(result).length != 0)
    return 1;
  else
    return 0;
  } catch (err) {
  console.error(err);
  }
}

module.exports.InsertIncoming = async function(req){
  try{
    console.log(req);
    if(await checkClient(req.body.customername) == 0)
    {
      let re = {};
      let bod = {
        CName : req.body.customername,
        AddressOne: req.body.customeraddress1,
        AddressTwo: req.body.customeraddress2,
        City: req.body.city,
        Pincode: req.body.pincode,
        Phoneno: "1231231222",
        gstin: req.body.gstin}
    
      re['body'] = bod
      await InsertClient(re);
      console.log("Insert Client\n");
    }

    for(let l = 0;l<req.body.drawingcode.length;l++)
    {
      if(await checkComponent(req.body.drawingcode[l]) == 0)
      {
       let re = {};

       re['body'] = {
        Drawingno: req.body.drawingcode[l],
        customer: req.body.customername,
        Description: req.body.desc[l],
        operation: req.body.operation[l],
        pricepiece: req.body.price[l],
        hsnnumber: req.body.hsn[l]
       };

       await InsertComponent(re);
       console.log("Insert Component\n");
      }
      else {
        let resultupdated = await ComponentModal.update({
          CO_PRICE_PIECE: req.body.price[l]
        },{
          where:{
            DRAWING_NO: req.body.drawingcode[l]
          }
        })
      }
    }
    
    console.log("Number of drawings");
    console.log(req.body.drawingcode.length);
    for(let l = 0;l<req.body.drawingcode.length;l++)
    {
       let re = {};
       
       re['body'] = {
        DCNo: req.body.dcno,
        DCDate: req.body.DCDate,
        Drawingno: req.body.drawingcode[l],
        RecievedQnt: req.body.qty[l],
        Price: req.body.price[l]
       };
       console.log(re);
       await InsertDispatch(re);
       console.log("Insert Dispatch\n");
    }

    return 1;
  } catch(err){
    console.error(err);
    return 0;
  }
}

//GetComponentOperation
module.exports.GetComponentOperation = async function(drawingcode) 
   {
    try 
    {
      let result = await ComponentModal.findAll({
        raw:true,
        where:{
          DRAWING_NO: drawingcode
        },
        attributes:['CO_OPERATION']
      });
      return(formateedit(result));
  } catch (err) {
    console.error(err);
  }
}

module.exports.DBClose = async function()
{
  sequelize.close();
}