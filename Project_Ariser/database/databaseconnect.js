"use strict";
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');
    
let connection = null;

module.exports.DBConnect = async function()
{
  try{        connection = await oracledb.getConnection(  {
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
        let result = await connection.execute(string.s_customer);
        return(result.rows);
  } catch (err) {
    console.error(err);
  }
}
  
module.exports.InsertClient = async function()
{
  try
  {
    //For inserting
    var myDate = new Date(2019,9,12);
    const sqlQuery = `INSERT INTO ASDB_CUSTOMER (C_ID, C_NAME, C_ADDRESS_ONE, C_ADDRESS_TWO, C_CITY, C_PINCODE, C_PHONE_NO, C_GSTIN) VALUES (:0, :1, :2, :3, :4, :5, :6, :7)`;
    let binds = [[2,'LPT','12, Teachers Colony','Ganapathy, Gandhinagar','Coimbatore','641006','9987650987','asd23123sdff12']];
    let result = await connection.executeMany(sqlQuery, binds, {autoCommit: true});
    console.log("Number of inserted rows:", result.rowsAffected);
  }
  catch (err) {
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

