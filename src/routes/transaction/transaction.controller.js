const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { transaction , emi } = require("../../../models")


// // 1 . Add Transaction
const AddTransaction = async (req, res, next) => {
    try {
        const today = new Date();

        const PayEMI = await emi.update(
            {
                paid_date: today,
                status: req.body.status,
            },
            {
                where: {
                    id: req.body.purchase_id
                }
            });

        console.log(PayEMI)

        return

        const data = await transaction.create({
            receipt_id: "2",
            is_by_cheque: TransactionInfo.is_by_cheque,
            is_by_cash: TransactionInfo.is_by_cash,
            is_by_upi: TransactionInfo.is_by_upi,
            cheque_no: TransactionInfo.chaque_no,
            cheque_date: TransactionInfo.cheque_date,
            upi_no: TransactionInfo.upi_no,
            amount: TransactionInfo.amount
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Purchase added successfully",
        });
    } catch (error) {
        next(error)
    }
}


// // 2 . Get all Transaction
const getallTransaction = catchAsyncErrors(async (req, res, next) => {
    let page = req.params.pageNo
    const itemsPerPage = 10
    const today = new Date();
    const AllTransaction = await transaction.findAll({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        where: {
            createdAt: today
        }
    })

    res.status(200).json({
        AllTransaction: AllTransaction,
        success: true,
        message: "All Transaction"
    })
})

// // 3 . Get Single Transaction
const getSingleTransaction = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleTransaction = await transaction.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleTransaction: SingleTransaction,
        success: true,
        message: "One Transaction Details"
    })
})

// // 4 . Update Transaction
const updateTransation = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const updateTransactionDetails = await transaction.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateTransactionDetails: updateTransactionDetails,
        success: true,
        message: "Transaction details updated"
    })
})

// // 5 . Delete Transaction
const deleteTransactionDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const DeleteTransactionDetails = await transaction.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteTransactionDetails: DeleteTransactionDetails,
        success: true,
        message: "Transaction deleted successfully"
    })

})



module.exports = {
    AddTransaction,
    getallTransaction,
    getSingleTransaction,
    updateTransation,
    deleteTransactionDetails
};
