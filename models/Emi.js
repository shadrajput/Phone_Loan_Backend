const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Emi = sequelize.define("emi", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paid_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchase_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'purchase',
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
    }
    )

    Emi.associate = function (models) {
        Emi.hasOne(models.receipt, { foreignKey: 'receipt_id' })
        Emi.belongsTo(models.purchase, { foreignKey: 'purchase_id' })
    };

    return Emi
}