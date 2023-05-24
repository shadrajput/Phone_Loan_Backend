const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        model_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        company_id:{
            type: DataTypes.INTEGER,
            references: {
              model: 'companies',
              key: 'id'
            }
          }
    })

    return Phone
}