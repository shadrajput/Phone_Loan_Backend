const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { receipt, emi, purchase, customer, phone, installment, company, admin, transaction, specification } = require("../../../models")
const db = require('../../../models')
const { Op } = require('sequelize');


// 1 . Add Receipt
const AddReceipt = async (req, res, next) => {

    const adminData = await admin.findOne({ where: { user_id, pin: security_pin } })

    if (!adminData) {
        return next(new ErrorHandler("Incorrect PIN", 401));
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        try {

            const ReceiptInfo = (fields);
            const allReceipts = await receipt.count();
            const receipt_id = allReceipts + 1

            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await receipt.create({
                receipt_id,
                emi_id: "3",
                admin_id: "1",
                extra_charge: ReceiptInfo.extra_charge
            });

            res.status(201).json({
                data: data,
                success: true,
                message: "Receipt added successfully",
            });
        } catch (error) {
            next(error)
        }
    });
}

// 2 . Get all Receipt
const getallReceipt = catchAsyncErrors(async (req, res, next) => {
    let page = req.params.pageNo
    const itemsPerPage = 10
    const AllReceipt = await receipt.findAll({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        where:{
            is_deleted: false
        },
        include: [
            {
                model: emi,
                include: [{
                    model: purchase,
                    include: [
                        customer,
                        installment,
                        {
                            model: phone,
                            include: [company]
                        }
                    ]
                }]
            }
        ]
    })

    const totalReceipt = await customer.count();

    res.status(200).json({
        AllReceipt: AllReceipt,
        pageCount: Math.ceil(totalReceipt / itemsPerPage),
        success: true,
        message: "All Receipt"
    })
})

// 3 . Get Single Receipt By Receipt Mobile 
const onerecieptDetailsbyNumber = catchAsyncErrors(async (req, res, next) => {
    let searchedValue = req.params.search;
    let page = req.params.pageNo
    const itemsPerPage = 10

    let SingleReceiptDetails = null;

    try {
        if (!isNaN(searchedValue) && searchedValue.length < 10) {
            SingleReceiptDetails = await receipt.findAll({
                skip: page * itemsPerPage,
                take: itemsPerPage,
                where: {
                    receipt_id: searchedValue,
                    is_deleted: false
                },
                include: [
                    {
                        model: emi,
                        include: [{
                            model: purchase,
                            include: [
                                {
                                    model: specification,
                                    include: {
                                        model: phone,
                                        include: [company]
                                    }
                                },
                                customer,
                                installment
                            ]
                        }]
                    },
                ]

            });
        }
        else if (!isNaN(searchedValue) && searchedValue.length == 10) {
            SingleReceiptDetails = await receipt.findAll({
                skip: page * itemsPerPage,
                take: itemsPerPage,
                where:{
                    is_deleted: false
                },
                include: [
                    {
                        model: emi,
                        include: [{
                            model: purchase,
                            include: [
                                {
                                    model: specification,
                                    include: {
                                        model: phone,
                                        include: [company]
                                    }
                                },
                                {
                                    model: customer,
                                    where: {
                                        mobile: searchedValue
                                    }
                                },
                                installment
                            ]
                        }]
                    },
                ]

            });
        }
        else {
            SingleReceiptDetails = await receipt.findAll({
                skip: page * itemsPerPage,
                take: itemsPerPage,
                where:{
                    is_deleted: false
                },
                include: [
                    {
                        model: emi,
                        include: [{
                            model: purchase,
                            include: [
                                {
                                    model: specification,
                                    include: {
                                        model: phone,
                                        include: [company]
                                    }
                                },
                                {
                                    model: customer,
                                    where: {
                                        full_name: {
                                            [Op.like]: `%${searchedValue}%`
                                        }
                                    }
                                },
                                installment
                            ]
                        }]
                    },
                ]

            });
        }

        const totalCustomer = await customer.count();

        res.status(200).json({
            data: SingleReceiptDetails,
            pageCount: Math.ceil(totalCustomer / itemsPerPage),
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

// 3 . Get Single Receipt By Purchase ID 
const getReceiptbyPurchaseId = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const SingleReceiptByPurchaseId = await receipt.findOne({
        where: {
            id: Number(id),
            is_deleted: false
        }
    })

    res.status(200).json({
        SingleReceiptByPurchaseId: SingleReceiptByPurchaseId,
        success: true,
    })

});

// 3 . Get Single Receipt By Emi ID 
const getReceiptbyEmiId = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleReceiptByEmiId = await receipt.findOne({
        where: {
            id: Number(id)
        },
        include: [
            {
                model: emi,
                include: [{
                    model: purchase,
                    include: [customer, installment, {
                        model: phone,
                        include: [
                            company
                        ]
                    }]
                }]
            }
        ]
    })

    res.status(200).json({
        SingleReceiptByEmiId: SingleReceiptByEmiId,
        success: true,
        message: "One Receipt Details By Purchase Id"
    })

});

// 4 . Get Single Receipt
const getSingleReceipt = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleReceipt = await receipt.findOne({
        where: {
            receipt_id: Number(id)
        },
        include: [
            {
                model: emi,
                include: [{
                    model: purchase,
                    include: [customer, installment, {
                        model: phone,
                        include: [
                            company
                        ]
                    }]
                }]
            }
        ]
    })

    res.status(200).json({
        SingleReceipt: SingleReceipt,
        success: true,
        message: "One Receipt Details"
    })
})

// 6 . Update receipt
const updateReceipt = catchAsyncErrors(async (req, res, next) => {

    const { 
        is_by_cash,
        is_by_cheque,
        is_by_upi,
        cheque_no,
        cheque_date,
        upi_no,
        user_id,
        purchase_id,
        Emi_id,
        Charge_amount,
        amount,
        security_pin,
        customer_id,
        date,
        emi_id 
    } = req.body


    const adminData = await admin.findOne({ where: {user_id, pin: security_pin}})

    if(!adminData){
        return next(new ErrorHandler("Incorrect PIN", 401));
    }

    //fetching emi amount
    const emi_details = await emi.findOne({
        where: {
            id: emi_id
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
    if (surplusEMIAmount > 0 && !upcomingEMI){
        res.status(401).json({
            success: false,
            message: "Please enter the complete amount"
        })
    }

    //fetching receipt details
    const receiptDetails = await receipt.findOne({where:{emi_id}})

    //updating in receipt table
    await receipt.update({
        extra_charge: Charge_amount,
        admin_id: user_id
    }, {
        where: {
            emi_id
        },
    })

    //updating transaction table
    await transaction.update({
        is_by_cash,
        is_by_cheque,
        is_by_upi,
        cheque_no,
        cheque_date,
        upi_no,
        amount
    },{
        where:{
            receipt_id: receiptDetails.id
        }
    })

    //updating in emi table
    await emi.update({
        amount: amount
    },
    {
        where:{
            id: emi_id
        }
    })

    if (surplusEMIAmount != 0){
        //updating upcoming EMI amount
        await emi.update({
            amount: db.sequelize.literal(`amount + ${surplusEMIAmount}`)
        },{
            where:{
                id: upcomingEMI.id
            }
        })

        //updating pending amount in purchase table
        await purchase.update({
            pending_amount: db.sequelize.literal(`pending_amount + ${surplusEMIAmount}`)
        },{
            where:{
                id: emi_details.purchase_id
            }
        })
    }


    res.status(200).json({
        success: true,
        message: "Receipt details updated"
    })
})

// 7 . Delete Receipt
const deleteReceiptDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const receipt_details = await receipt.findOne({
        where:{id: Number(id)},
        include: transaction
    })

    const DeleteReceiptDetails = await receipt.update({is_deleted: true},{
        where: {
            id: Number(id)
        }
    })
    
    //updating EMI status
    await emi.update(
        {
            paid_date: null,
            status: 'pending',
        },
        {
            where: {
                id: receipt_details.emi_id,
            }
        }
    );

    const emi_details = await emi.findOne({
        where:{
            id: receipt_details.emi_id
        }
    })

    await purchase.update({
        pending_amount: db.sequelize.literal(`pending_amount + ${receipt_details.transaction.amount}`)
    }, {
        where: {
            id: emi_details.purchase_id
        },
    })

    res.status(200).json({
        success: true,
        message: "Receipt deleted successfully"
    })

})



module.exports = {
    AddReceipt,
    getallReceipt,
    getSingleReceipt,
    updateReceipt,
    deleteReceiptDetails,
    getReceiptbyEmiId,
    onerecieptDetailsbyNumber,
    getReceiptbyPurchaseId
};
