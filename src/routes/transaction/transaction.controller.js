const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { transaction, emi, receipt, purchase, customer, phone, company, installment, specification, admin } = require("../../../models")
const db = require('../../../models')

// // 1 . Add Transaction
const AddTransaction = async (req, res, next) => {
    try {
        const Admin = await admin.findOne(
            {
                where: {
                    user_id: req.body.user_id,
                    pin: req.body.security_pin
                }
            }
        );

        if (!Admin) {
            return res.status(500).json({ success: false, message: "Invalid Security Pin" });
        }

        const PayEMI = await emi.update(
            {
                paid_date: req.body.date,
                status: 'paid',
            },
            {
                where: {
                    id: req.body.Emi_id,
                    purchase_id: req.body.purchase_id
                }
            }
        );

        const EMI = await emi.findOne(
            {
                where: {
                    id: req.body.Emi_id
                }
            }
        );

        const allReceipts = await receipt.count();
        const receipt_id = allReceipts + 1 + 1000

        const Receipt = await receipt.create(
            {
                emi_id: EMI.id,
                admin_id: Admin.id,
                receipt_id,
                extra_charge: req.body.Charge_amount
            }
        );

        const data = await transaction.create({
            receipt_id: Receipt.id,
            is_by_cheque: req.body.is_by_cheque,
            is_by_cash: req.body.is_by_cash,
            is_by_upi: req.body.is_by_upi,
            cheque_no: req.body.cheque_no,
            cheque_date: req.body.cheque_date,
            upi_no: req.body.upi_no,
            amount: req.body.amount
        });

        await purchase.update({
            pending_amount: db.sequelize.literal(`pending_amount - ${req.body.amount}`)
        },{
            where:{
                id: EMI.purchase_id
            },
        })

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

    const totaltransection = await transaction.count();

    res.status(200).json({
        AllTransaction: AllTransaction,
        pageCount: Math.ceil(totaltransection / itemsPerPage),
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

// // 3 . Get Single Transaction By Receipt ID
const getSingleTransactionByReceiptId = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleTransaction = await transaction.findOne({
        where: {
            receipt_id: Number(id)
        },
        include: [
            {
                model: receipt,
                include: [{
                    model: emi,
                    include: [{
                        model: purchase,
                        include: [
                            customer, 
                            installment,
                            {
                                model: specification,
                                include:{
                                    model: phone,
                                    include: [
                                        company
                                    ]
                                }
                            }
                        ]
                    }]
                }]
            }
        ]
    })

    const allEMI = await emi.findAll({
        where:{
            purchase_id: SingleTransaction?.receipt?.emi.purchase.id
        },
        order: [['due_date', 'ASC']]
    })

    let emiCount = null
    for(let i=0; i<allEMI.length; i++) {
        if (allEMI[i].id == SingleTransaction?.receipt?.emi.id){
            emiCount = i + 1;
            break;
        }
    }

    const PendingAmount = await emi.findAll({
        where: {
            id: SingleTransaction.receipt.emi.id
        },
        include: [
            purchase
        ]
    });

    res.status(200).json({
        SingleTransaction: SingleTransaction,
        PendingAmount: PendingAmount,
        emiCount,
        success: true
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
    deleteTransactionDetails,
    getSingleTransactionByReceiptId
};
