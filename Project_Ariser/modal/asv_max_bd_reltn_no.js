/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('asv_max_bd_reltn_no', {
      MAX_NO: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      }
    }, {
      tableName: 'asv_max_bd_reltn_no'
    });
  };