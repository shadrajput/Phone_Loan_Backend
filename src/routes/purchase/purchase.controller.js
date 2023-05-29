const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { purchase } = require("../../../models")
const { phone } = require("../../../models")
const { customer } = require("../../../models")
const { installment } = require("../../../models")

// 1 . Add Purchase
const AddPurchase = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        try {

            const PurchaseInfo = (fields);

            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await purchase.create({
                customer_id: "3",
                phone_id: "2",
                installment_id: "1",
                pending_amount: PurchaseInfo.pending_amount,
                net_amount: PurchaseInfo.net_amount

            });

            res.status(201).json({
                data: data,
                success: true,
                message: "Purchase added successfully",
            });
        } catch (error) {
            next(error)
        }
    });
}


// 2 . Get all Purchase
const getallPurchase = catchAsyncErrors(async (req, res, next) => {

    const AllPurchase = await purchase.findAll({
        include: [customer, phone]
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

// 3 . Get Single Purchase
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
    updatePurchase,
    deletePurchaseDetails
};
