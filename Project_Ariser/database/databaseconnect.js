var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');
var string = require('../utilities/string');

class DBConnect {

    constructor() {
        this.connection = oracledb.getConnection(
            {
              user          : dbConfig.user,
              password      : dbConfig.password,
              connectString : dbConfig.connectString
            },
            function(err, connection) {
              if (err) {
                console.error(err.message);
                return;
              }
              console.log('Connection was successful!');
          });
    }
  
    getcustomers() {
        binds = [];
        options = {
            outFormat: oracledb.OBJECT
        };
        
        result = this.connection.execute[string.s_customer, binds, options];
        console.log(result);
    }

    dbclose(){
        if (this.connection) {
            try {
              this.connection.close();
            } catch (err) {
              console.error(err);
            }
      }
    }
}
module.exports = DBConnect;