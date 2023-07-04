const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Admin = sequelize.define("admin", {
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
      pin:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
  },
  {
    freezeTableName: true,
  }
  )

  Admin.associate = function (models) {
    Admin.belongsTo(models.user, { foreignKey: 'user_id' })
    // Admin.hasOne(models.receipt, { foreignKey: 'receipt_id' })
};  

  return Admin
}