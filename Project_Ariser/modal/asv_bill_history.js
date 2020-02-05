/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_bill_history', {
        BILL_NO: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
      },
      C_NAME: {
        type: DataTypes.STRING(80),
        allowNull: true
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
      PAYMENT_RECIEVED: {
        type: DataTypes.INTEGER(11),
      allowNull: true
      }
    }, {
      tableName: 'asv_bill_history'
    });
  };