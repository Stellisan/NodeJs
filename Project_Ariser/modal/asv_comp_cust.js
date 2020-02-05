/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_comp_cust', {
        DRAWING_NO: {
          type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      CO_DESCRIPTION: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      C_NAME: {
        type: DataTypes.STRING(80),
        allowNull: true
      },
      CO_PRICE_PIECE: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      CO_HSN: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      CO_OPERATION: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    }, {
      tableName: 'asv_comp_cust'
    });
  };
  