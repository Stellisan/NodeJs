/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_dc_history', {
        DC_NO: {
            type: DataTypes.STRING(20),
            allowNull: false,
      },
      DC_DATE: {
        type: DataTypes.DATE,
        allowNull: true
      },
      C_NAME: {
        type: DataTypes.STRING(80),
        allowNull: true
      },
      DRAWING_NO: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CO_DESCRIPTION: {
        type: DataTypes.STRING(100),
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
      tableName: 'asv_dc_history'
    });
  };