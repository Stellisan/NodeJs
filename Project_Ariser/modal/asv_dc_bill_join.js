/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_dc_bill_join', {
      BD_RELTN_NO: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      DC_NO: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      BILL_NO: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      DRAWING_NO: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      QUANTITY: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      TOTAL: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      DCDCNO: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      DCDATE: {
        type: DataTypes.STRING(69),
        allowNull: true
      },
      DCDRAWINGNO: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      PHY_QUAN: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      REC_QUAN: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    }, {
      tableName: 'asv_dc_bill_join'
    });
  };
  