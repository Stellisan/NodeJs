/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asv_latestcomp', {
    DC_NO: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    DC_DATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DRAWING_NO: {
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
    tableName: 'asv_latestcomp'
  });
};
