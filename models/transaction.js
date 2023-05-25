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
        },
        is_by_cash: {
            type: DataTypes.BOOLEAN,
        },
        is_by_upi: {
            type: DataTypes.BOOLEAN,
        },
        cheque_no: {
            type: DataTypes.INTEGER,
        },
        cheque_date: {
            type: DataTypes.DATE,
        },
        upi_no: {
            type: DataTypes.INTEGER,
        },
        amount: {
            type: DataTypes.INTEGER,
        },


    })

    return Transaction
}