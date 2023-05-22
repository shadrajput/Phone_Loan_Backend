const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Document = sequelize.define("document", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    adhar_front:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    adhar_back:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    pancard:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    light_bill:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

  return Document
}