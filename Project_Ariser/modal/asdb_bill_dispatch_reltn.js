/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asdb_bill_dispatch_reltn', {
    BD_RELTN_NO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    DC_NO: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'asdb_dispatch',
        key: 'DC_NO'
      }
    },
    BILL_NO: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'asdb_bill',
        key: 'BILL_NO'
      }
    },
    DRAWING_NO: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'asdb_component',
        key: 'DRAWING_NO'
      }
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
    tableName: 'asdb_bill_dispatch_reltn'
  });
};
