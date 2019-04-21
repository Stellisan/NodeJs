"use strict";
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');
    
let connection = null;

  async function getCustomers() 
   {
    try {
        connection = await oracledb.getConnection(  {
                    user          : "system",
                    password      : "admin",
                    connectString : "localhost:1521/xe"
                });

    let result = await connection.execute(
            string.s_customer
        );
    
        return(result.rows);
//For inserting
    // const sqlQuery = `INSERT INTO system.asdb_client (CLIENT_ID, C_TIN_DATE, C_ADDRESS_ONE, C_ADDRESS_TWO, C_CITY, C_PINCODE, C_PHONE_NO, C_NAME, C_STATE, C_COUNTRY) VALUES (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)`;

    // binds = [[6,myDate,'12, Teachers Colony','Ganapathy, Gandhinagar','Coimbatore','641006','9987650987','LPT','Tamil Nadu','India']];

    // result = await connection.executeMany(sqlQuery, binds, {autoCommit: true});

    // console.log("Number of inserted rows:", result.rowsAffected);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}



    function dbclose()
    {
        if (connection) {
            try {
              connection.close();
            } catch (err) {
              console.error(err);
            }
      }
    }
module.exports.DBConnect = getCustomers;