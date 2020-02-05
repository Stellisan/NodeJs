/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asdb_bill', {
    BILL_NO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    B_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    B_GST: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    B_TOTAL_PRICE: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    B_SUB_TOTAL: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    PAYMENT_RECIEVED: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'asdb_bill'
  });
};
