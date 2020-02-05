/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('asdb_customer', {
    C_ID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    C_NAME: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    C_ADDRESS_ONE: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    C_ADDRESS_TWO: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    C_CITY: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    C_PINCODE: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    C_PHONE_NO: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    C_GSTIN: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'asdb_customer'
  });
};
