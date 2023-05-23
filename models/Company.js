const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("company", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_name: {
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
    })

    return Company
}