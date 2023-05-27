const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define("specification", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ram: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    storage: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true,
    },
    phone_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'phone',
        key: 'id'
      }
    }
  },
  {
    freezeTableName: true,
  }
  )

  Specification.associate = function (models) {
    Specification.belongsTo(models.phone, { foreignKey: 'phone_id' })
  };

  return Specification
}