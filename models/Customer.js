const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: {
          args: true,
          msg: 'Please enter only letters'
        }
      }
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: {
          args: true,
          msg: 'Please enter only letters'
        }
      }
    },
    mobile:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternate_no:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference_name:{
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-z ]+$/i
      }
    },
    reference_mobile:{
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   min:{
      //     args: 10,
      //     msg: "Please enter valid mobile number"
      //   },
      //   max:{
      //     args: 10,
      //     msg: "Please enter valid mobile number"
      //   },
      // }
    },
    document_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'document',
        key: 'id'
      }
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
    
  },{
  tableName: 'customer' // We need to choose the model name
})

  return Customer
}