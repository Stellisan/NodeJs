"use strict";

let connection = require("../database/databaseconnect_oraccle");

async function ui()
{
    await connection.DBConnect();
    let result = await connection.GetComponent();
    console.log(result);
    connection.DBClose();
}

ui();