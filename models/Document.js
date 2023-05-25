const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Document = sequelize.define("document", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    adhar_front:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    adhar_back:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    pancard:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    light_bill:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
  tableName: 'document' // We need to choose the model name
})

  return Document
}