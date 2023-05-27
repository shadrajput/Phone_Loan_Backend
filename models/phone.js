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
        company_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'companies',
                key: 'id'
            }
        }
    })

    Phone.associate = function (models) {
        Phone.belongsTo(models.company , {foreignKey : 'company_id'})
    };  

    Phone.associate = function (models) {
        Phone.hasMany(models.specification , {foreignKey : 'phone_id'})
        Phone.hasMany(models.purchase , {foreignKey : 'phone_id'})
    };

    return Phone
}