"use strict";
var mysqldb = require('mysql');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');

let connection = null;

var pool = mysqldb.createPool({
    host: dbConfig.mysqlconnectString,
    user: dbConfig.mysqlusername,
    password: dbConfig.mysqlpassword,
    database: 'ariserdb',
    port: 3306
});

const options = {
    host: dbConfig.mysqlconnectString,
    user: dbConfig.mysqlusername,
    password: dbConfig.mysqlpassword,
    database: 'ariserdb',
    port: 3306
}

module.exports.DBConnect = async function()
{
    connection = mysqldb.createConnection(options);
    connection.connect(async function(err){
        if(err)
        {
            console.error('An error occured while connecting to the DB');
            throw(err);
        }    
    });
};

async function selectCustomer(err, res)
{
    if(err) throw err;
    console.log(res.length);
   // console.log(res[1]);
   for(let index = 0; index < res.length; index++)
   {
    results = res[0];
   }
}

module.exports.GetCustomers = async function() 
   {
    let results = 10;
    try 
    {
        // await pool.getConnection(async function(err, connection){
        //     await connection.query(string.s_selectcustomer, async function(err, res){
        //         await selectCustomer(err, res);
        //     });
        //     await connection.release();
        //     console.log(results);
        // });
        
        
        await connection.query(string.s_selectcustomer, async function(err, res){
            console.log(results);
                results = res[0];
                //console.log(res[0]);
                return results;
                });

  } catch (err) {
    console.error(err);
  }
  console.log('sdf');
}

module.exports.InsertCustomer = async function()
{
    try{
        let insertedrow = 0;

        //let result = await connection.execute("SELECT max(ac.C_ID) from ASDB_CUSTOMER ac");

        let sql = "INSERT INTO ASDB_CUSTOMER (C_ID, C_NAME, C_ADDRESS_ONE, C_ADDRESS_TWO, C_CITY, C_PINCODE, C_PHONE_NO, C_GSTIN) VALUES ?";
        let values = [
            ['3','Companyt','AddressOne','AddressTwo','City1','987654','1234567890','dfsdf234']
        ];

        pool.getConnection(async function(err, connection){
            await connection.query(sql, [values], function(err, res){
                if(err){
                    console.log(err.message);
                    return;
                }

                console.log(res.affectedRows);
            });
            await connection.release();
        });
    }
    catch (err) {
        console.error(err);
    }
}

