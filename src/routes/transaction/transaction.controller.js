const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { transaction, emi, receipt, purchase, customer, phone, company, installment, specification, admin } = require("../../../models")
const db = require('../../../models')

// // 1 . Add Transaction
const AddTransaction = async (req, res, next) => {
    try {
        const { amount, Emi_id, purchase_id, date, Charge_amount } = req.body

        const Admin = await admin.findOne(
            {
                where: {
                    user_id: req.body.user_id,
                    pin: req.body.security_pin
                }
            }
        );

        if (!Admin) {
            return next(new ErrorHandler("Incorrect PIN", 401));
        }


        await emi.update(
            {
                paid_date: date,
                status: 'paid',
            },
            {
                where: {
                    id: Emi_id,
                    purchase_id: purchase_id
                }
            }
        );

        //fetching emi amount
        const emi_details = await emi.findOne({
            where: {
                id: Emi_id
            }
        })

        const oldEMIAmount = emi_details.amount;

        const surplusEMIAmount = oldEMIAmount - amount

        //adjusting surplus amount
        const upcomingEMI = await emi.findOne({
            where: {
                status: 'pending'
            },
            order: [['due_date', 'ASC']]
        })

        //If paying less than the actual EMI amount and this is the last EMI
        if (surplusEMIAmount > 0 && !upcomingEMI) {
            await emi.update(
                {
                    paid_date: null,
                    status: 'pending',
                },
                {
                    where: {
                        id: Emi_id,
                        purchase_id: purchase_id
                    }
                }
            );

            return res.status(401).json({
                success: false,
                message: "Please enter the complete amount"
            })
        }

        //updating in emi table
        await emi.update(
            {
            amount: amount
            },
            {
                where: {
                    id: Emi_id
                }
            }
        );

        if (surplusEMIAmount != 0) {
            //updating upcoming EMI amount
            await emi.update({
                amount: db.sequelize.literal(`amount + ${surplusEMIAmount}`)
            }, {
                where: {
                    id: upcomingEMI.id
                }
            })
        }


        const allReceipts = await receipt.count();
        const receipt_id = allReceipts + 1 

        const Receipt = await receipt.create(
            {
                emi_id: emi_details.id,
                admin_id: Admin.id,
                receipt_id,
                extra_charge: Charge_amount == '' ? 0 : Number(Charge_amount)
            }
        );

        const data = await transaction.create({
            receipt_id: Receipt.id,
            is_by_cheque: req.body.is_by_cheque,
            is_by_cash: req.body.is_by_cash,
            is_by_upi: req.body.is_by_upi,
            cheque_no: req.body.cheque_no == '' ? -1 : Number(req.body.cheque_no),
            cheque_date: req.body.cheque_date,
            upi_no: req.body.upi_no == '' ? -1 : Number(req.body.upi_no),
            amount: amount
        });

        await purchase.update({
            pending_amount: db.sequelize.literal(`pending_amount - ${amount}`)
        },{
            where:{
                id: emi_details.purchase_id
            },
        })

        return res.status(201).json({
            data: data,
            success: true,
            message: "EMI paid successfully",
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
                where:{
                    is_deleted: false
                },
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
