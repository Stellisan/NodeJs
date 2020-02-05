/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_min_date_comp', {
    MIN_DATE: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    DRAWING_NO: {
        type: DataTypes.STRING(50),
        allowNull: false,
        }
    },{
      tableName: 'asv_min_date_comp'
    });
  };