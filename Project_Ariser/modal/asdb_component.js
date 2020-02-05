/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asdb_component', {
    DRAWING_NO: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    C_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'asdb_customer',
        key: 'C_ID'
      }
    },
    CO_DESCRIPTION: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CO_OPERATION: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CO_PRICE_PIECE: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CO_HSN: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'asdb_component'
  });
};
