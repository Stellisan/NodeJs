/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asv_comp_operations', {
      DRAWING_NO: {
        type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    CO_OPERATION: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'asv_comp_operations'
  });
};
