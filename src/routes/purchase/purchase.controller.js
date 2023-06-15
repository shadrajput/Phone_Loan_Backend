const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { purchase, company, phone, customer, installment, specification } = require("../../../models")

// 1 . Add Purchase
const AddPurchase = async (req, res, next) => {
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

        const data = await purchase.create({
            customer_id: req.body.customer_id,
            phone_id: Phone.id,
            installment_id: Installment.id,
            pending_amount: req.body.net_payable,
            net_amount: req.body.net_payable

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


// 2 . Get all Purchase
const getallPurchase = catchAsyncErrors(async (req, res, next) => {

    const AllPurchase = await purchase.findAll({
        include: [customer, phone, installment]
    })

    res.status(200).json({
        AllPurchase: AllPurchase,
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
        include: [customer, phone, installment]
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
        include: [customer, installment, phone]
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
    console.log(CustomerName)
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
                        last_name: CustomerName,
                    },
                },
                installment,
                {
                    model: phone,
                    include: [company],
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
    console.log(id)
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
