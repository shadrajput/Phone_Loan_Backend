const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { purchase, company, phone, customer, installment, receipt, specification, emi, transaction } = require("../../../models")
const { Op } = require('sequelize');

// 1 . Add Purchase
const AddPurchase = async (req, res, next) => {
    let Down_Payment = req.body.Down_Payment

    try {

        const Company = await company.findOne({
            where: {
                company_name: req.body.company_name
            },
        });

        const Phone = await phone.findOne({
            where: {
                company_id: Company.id
            },
        });

        const Specification = await specification.findOne({
            where: {
                phone_id: Phone.id
            },
        });

        const Installment = await installment.findOne({
            where: {
                month: req.body.month
            },
        });

        const pending_amount = Math.round(
            (
                (
                    req.body.net_payable - (Down_Payment == '' ? 0 : Number(Down_Payment))
                ) 
                / 
                req.body.month
            ) * req.body.month
        );

        const data = await purchase.create({
            customer_id: req.body.customer_id,
            specification_id: Specification.id,
            installment_id: Installment.id,
            pending_amount: pending_amount,
            net_amount: req.body.net_payable,
            iemi: req.body.iemi
        });

        let Payable_amount = req.body.net_payable - (Down_Payment == '' ? 0 : Number(Down_Payment))
        let Emi_Amount = Math.round(Payable_amount / (Number(req.body.month) + (Down_Payment == '' ? 1 : 0)))

        //entry of DP
        if(Down_Payment == ''){
            const emiDetails = await emi.create({
                amount: Emi_Amount,
                due_date: req.body.date,
                status: "pending",
                type: 'dp',
                purchase_id: data.id,
            });
        }
        else{
            const emiDetails = await emi.create({
                amount: Down_Payment,
                due_date: req.body.date,
                paid_date: req.body.date,
                status: "paid",
                type: 'dp',
                purchase_id: data.id,
            });

            // DP Receipt
            const allReceipts = await receipt.count();
            const receipt_id = allReceipts + 1 + 1000
            
            const Receipt = await receipt.create(
                {
                    emi_id: emiDetails.id,
                    admin_id: req.body.admin_id,
                    extra_charge: 0,
                    receipt_id
                }
            );

            const Transection = await transaction.create({
                receipt_id: Receipt.id,
                is_by_cheque: false,
                is_by_cash: true,
                is_by_upi: false,
                amount: req.body.Down_Payment
            });
        }

        //entry of EMI
        for (let i = 0; i < req.body.month; i++) {
            const currentDate = new Date(req.body.date);
            currentDate.setMonth(currentDate.getMonth() + (i + 1));

            await emi.create({
                amount: Emi_Amount,
                due_date: currentDate,
                status: "pending",
                type: 'emi',
                purchase_id: data.id,
            });
        }

        //finding all emi
        const EMI = await emi.findAll({
            where: {
                purchase_id: data.id
            }
        })

        res.status(201).json({
            data: data, EMI,
            success: true,
            message: "Purchase Added Successfully",
        });
    } catch (error) {
        next(error)
    }
}

// 2 . Get all Purchase
const getallPurchase = catchAsyncErrors(async (req, res, next) => {

    let page = req.params.pageNo
    const itemsPerPage = 10

    const AllPurchase = await purchase.findAll({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        include: [
            customer,
            installment,
            {
                model: specification,
                include:{
                    model: phone,
                    include: [company],
                }
            }
        ]
    })

    const totalCustomer = await customer.count();

    res.status(200).json({
        AllPurchase: AllPurchase,
        pageCount: Math.ceil(totalCustomer / itemsPerPage),
        success: true,
        message: "All Purchase"
    })
})

// 3 . Get all Purchase By Customer Id
const getSinglePurchasebyCustomerId = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const CustomerAllPurchase = await purchase.findAll({
        where: {
            customer_id: Number(id)
        },
        include: [
            customer,
            installment,
            {
                model: specification,
                include: {
                    model: phone,
                    include: [company],
                }
            },
            {
                model: emi,
                where: {
                    type: 'dp',
                },
                limit: 1,
                required: false,
            },
        ],
        
    })

    res.status(200).json({
        CustomerAllPurchase: CustomerAllPurchase,
        success: true,
        message: "All Purchase"
    })
})

// 4 . Get Single Purchase By Purchase Id
const getSinglePurchase = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SinglePurchase = await purchase.findOne({
        where: {
            id: Number(id)
        },
        include: [
            customer, 
            installment, 
            {
                model: specification,
                include: {
                    phone
                }
            }
        ]
    })

    res.status(200).json({
        SinglePurchase: SinglePurchase,
        success: true,
        message: "One Purchase Details"
    })
})

// 4 . Get Single Purchase By Customer Mobile 
const oneCustomerDetailsbyNumber = catchAsyncErrors(async (req, res, next) => {

    let CustomerName = req.params.search;

    let page = req.params.pageNo
    const itemsPerPage = 10

    try {
        const SingleCustomerDetails = await purchase.findAll({
            skip: page * itemsPerPage,
            take: itemsPerPage,
            include: [
                {
                    model: customer,
                    where: {
                        [Op.or]: [
                            {
                                last_name: CustomerName,
                            },
                            {
                                mobile: CustomerName
                            }
                        ]
                    },
                },
                installment,
                {
                    model: specification,
                    include: {
                        model: phone,
                        include: [company]
                    }
                }
            ],

        });

        const totalCustomer = await customer.count();

        res.status(200).json({
            data: SingleCustomerDetails,
            pageCount: Math.ceil(totalCustomer / itemsPerPage),
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

// 4 . Update Purchase
const updatePurchase = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const updatePurchaseDetails = await purchase.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updatePurchaseDetails: updatePurchaseDetails,
        success: true,
        message: "Purchase details updated"
    })
})

// 5 . Delete Purchase
const deletePurchaseDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const DeletePurchaseDetails = await purchase.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeletePurchaseDetails: DeletePurchaseDetails,
        success: true,
        message: "Purchase deleted successfully"
    })

})



module.exports = {
    AddPurchase,
    getallPurchase,
    getSinglePurchase,
    getSinglePurchasebyCustomerId,
    oneCustomerDetailsbyNumber,
    updatePurchase,
    deletePurchaseDetails
};
