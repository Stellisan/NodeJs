"use strict";
var mysql = require('mysql');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');
var Sequelize = require('sequelize');
const Model = Sequelize.Model;
const customer = require('../modal/asdb_customer');
const Datatypes = Sequelize.DataTypes;

var r = null;
let yu = null;

async function Fun(){
    const sequelize = new Sequelize('ariserdb',dbConfig.mysqlusername,dbConfig.mysqlpassword,{
        host:dbConfig.mysqlconnectString,
        dialect: "mysql",
        port: 3306,
        define: {
            timestamps: false
        }
    });

    let CustModal = customer(sequelize,Datatypes);

    await sequelize
        .authenticate()
        .then(() => {
            console.log("Connection succesful");
        })
        .catch(err => {
            console.error('Unable to connect');
        });

    let yur = await CustModal.findAll();
    yu = JSON.stringify(yur,null,4);
    console.log(yu);
}

Fun();

function uset(users)
{
    //console.log(JSON.stringify(users,null,4));
    r = JSON.stringify(users,null,4);
}

//console.log(r);
//sequelize.close();

// var con = mysql.createConnection({
//     host: dbConfig.mysqlconnectString,
//     user: dbConfig.mysqlusername,
//     password: dbConfig.mysqlpassword,
//     database: 'ariserdb',
//     port: 3306
// });

// con.connect(async function(err) {
//   if (err) throw err; 
//   await con.query("select * from ASDB_CUSTOMER", selcust);
//   await console.log(r);
// });

// async function selcust(err, result, fields)
// {
//     r = result;
//     console.log(r);

// }

// console.log("Fun");