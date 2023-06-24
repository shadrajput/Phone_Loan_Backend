const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 3,
          msg: "Please enter alleast 3 characters"
        },
      }
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    }
  },
    {
      freezeTableName: true,
    }
  )

  User.associate = function (models) {
    User.hasOne(models.customer, { foreignKey: 'user_id' })
    User.hasMany(models.admin, { foreignKey: 'admin_id' })

  };

  return User
}