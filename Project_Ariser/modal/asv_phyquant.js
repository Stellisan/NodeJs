/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asv_phyquant', {
    C_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    DRAWING_NO: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TOTAL_QUAN: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'asv_phyquant'
  });
};
