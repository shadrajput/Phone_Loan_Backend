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
    charges:{
      type: DataTypes.INTEGER,
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