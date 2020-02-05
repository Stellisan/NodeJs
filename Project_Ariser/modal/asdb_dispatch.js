/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asdb_dispatch', {
    DC_NO: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    DC_DATE: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DRAWING_NO: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'asdb_component',
        key: 'DRAWING_NO'
      }
    },
    PHY_QUAN: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    REC_QUAN: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    RATE_PIECE: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'asdb_dispatch'
  });
};
