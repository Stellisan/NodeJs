/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asv_billbymonth', {
    BILL_NO: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    C_NAME: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    B_SUB_TOTAL: {
      type: DataTypes.INTEGER(11),
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
    BDATE: {
      type: DataTypes.STRING(69),
      allowNull: true
    }
  }, {
    tableName: 'asv_billbymonth'
  });
};
