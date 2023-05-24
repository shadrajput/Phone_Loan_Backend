const { sequelize, DataTypes, Transaction } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("transaction", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        receipt_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'receipts',
                key: 'id'
            }
        },
        is_by_cheque: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_by_cash: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_by_upi: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        cheque_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cheque_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        upi_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },


    })

    return Transaction
}