const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Receipt = sequelize.define("receipt", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        emi_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'emis',
                key: 'id'
            }
        },
        admin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'admins',
                key: 'id'
            }
        },
        extra_charge: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Receipt
}