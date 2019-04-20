var express = require('express');
var app = express();
var home = require('./utilities/home');
var bill = require('./utilities/bill');
var dbConfig = require('./database/dbconfig');
var string = require('./utilities/string');

var oracledb = require('oracledb');
// app.use('/public', express.static(__dirname + '/public'));
// app.set('view engine', 'ejs');

// app.use('/pages',home);
// app.use('/pages',bill);

// let connection = oracledb.getConnection(
//     {
//       user          : dbConfig.user,
//       password      : dbConfig.password,
//       connectString : dbConfig.connectString
//     },
//     function(err, connection) {
//       if (err) {
//         console.error(err.message);
//         return;
//       }
//       console.log('Connection was successful!');
//   });
//   binds = [];
  
//   result = oracledb.execute(string.s_customer, binds);
//   console.log(result);

//   if (connection) {
//     try {
//       connection.close();
//     } catch (err) {
//       console.error(err);
//     }
// }

let connection;
var oracledb = require('oracledb');

// (async function() {
oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    }, 
    function(err, connection){
      if(err)
      {
        console.error("db has connected failed: " + err.message);
        return ;
      }
  
      console.log("db has connected ");
  
      //read one
   readOne(connection);
  });
  
  //read one

  function readOne(connection)
  {
    var sql = "select * from ASDB_BILL";
    var params = [];
    connection.execute(sql, params, function(err, result){
      if(err)
      {
        console.error("query failed: " + err.message);
                          console.error(err);
        return ;
      }
  
     // console.log(result);
      console.log(result.rows[0]);
  doRelease(connection);
    });
  }
  
  function doRelease(connection)
  {
    connection.close(function(err){
      if(err)
      {
        console.error("close db connection failed:" + err.message);
      }
  
      return;
    });
  }
  // })()

app.listen(3000);