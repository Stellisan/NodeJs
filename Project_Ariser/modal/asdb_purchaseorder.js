/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asdb_purchaseorder', {
    PURCHASENO: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    DRAWING_NO: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'asdb_component',
        key: 'DRAWING_NO'
      }
    },
    P_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    P_QUANTITY: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'asdb_purchaseorder'
  });
};
