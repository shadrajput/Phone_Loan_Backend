const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min:{
          args: 3,
          msg: "Please enter alleast 3 characters"
        },
      }
    }
  })

  return User
}