"use strict";

let connection = require("../database/databaseconnect.js");

async function ui()
{
    await connection.DBConnect();
    let billdetail = {
        statuss: "close",
        billnumber: 1
    }
    let results = await connection.GetMaxBillNumber();
    
    console.log(results);
    await connection.DBClose();
}

ui();