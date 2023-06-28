const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) =>{
  const Customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    photo:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    
  },
  {
    freezeTableName: true,
  }
  )

Customer.associate = function (models) {
  Customer.hasMany(models.purchase, { foreignKey: 'customer_id' });
  Customer.belongsTo(models.document, { foreignKey: 'document_id' });
  Customer.belongsTo(models.user, { foreignKey: 'user_id' })
};

  return Customer
}