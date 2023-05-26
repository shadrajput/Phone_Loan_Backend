const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define("purchase", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        phone_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'phones',
                key: 'id'
            }
        },
        installment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'installments',
                key: 'id'
            }
        },
        pending_amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        net_amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Purchase.associate = function (models) {
        Purchase.belongsTo(models.phone, { foreignKey: 'phone_id' })
        Purchase.belongsTo(models.customer, { foreignKey: 'customer_id' })
      };

    return Purchase
}