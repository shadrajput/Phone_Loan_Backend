const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Receipt = sequelize.define("receipt", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        receipt_id:{
            type: DataTypes.INTEGER(11),
            allowNull: false,
            unique: true,
        },
        emi_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'emi',
                key: 'id'
            }
        },
        extra_charge: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'admin',
                key: 'id'
            }
        }
    },
        {
            freezeTableName: true,
        }
    )

    Receipt.associate = function (models) {
        Receipt.belongsTo(models.emi, { foreignKey: 'emi_id' })
        // Receipt.belongsTo(models.admin, { foreignKey: 'admin_id' })
        Receipt.hasOne(models.transaction, { foreignKey: 'receipt_id' })
    };

    return Receipt
}