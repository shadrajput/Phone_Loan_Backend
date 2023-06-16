const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Installment = sequelize.define("installment", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    month:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    charges:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
  )

  Installment.associate = function (models) {
    Installment.hasMany(models.purchase, { foreignKey: 'installment_id' })
  };

  return Installment
}