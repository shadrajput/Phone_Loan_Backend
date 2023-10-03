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
                model: 'customer',
                key: 'id'
            }
        },
        specification_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'specification',
                key: 'id'
            }
        },
        installment_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'installment',
                key: 'id'
            }
        },
        pending_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        iemi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        colour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        net_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bill_number:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        freezeTableName: true,
    })

    Purchase.associate = function (models) {
        Purchase.belongsTo(models.specification, { foreignKey: 'specification_id' })
        Purchase.belongsTo(models.customer, { foreignKey: 'customer_id' })
        Purchase.belongsTo(models.installment, { foreignKey: 'installment_id' })
        Purchase.hasMany(models.emi, { foreignKey: 'purchase_id' })

    };

    return Purchase
}