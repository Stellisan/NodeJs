/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asv_hsntotalsum', {
    HSN: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    QUANTITY: {
      type: "DOUBLE",
      allowNull: true
    },
    TOTAL: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    BDATE: {
      type: DataTypes.STRING(7),
      allowNull: true
    }
  }, {
    tableName: 'asv_hsntotalsum'
  });
};
