/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_bill_dc_reltn_billno', {
      BILL_NO: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      DRAWING_NO: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      CO_DESCRIPTION: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      CO_HSN: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      CO_PRICE_PIECE: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      QUANTITY: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      TOTAL: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    }, {
      tableName: 'asv_bill_dc_reltn_billno'
    });
  };
  