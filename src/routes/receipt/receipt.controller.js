const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { receipt } = require("../../../models")


// 1 . Add Receipt
const AddReceipt = async (req, res, next) => {

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        try {

            const ReceiptInfo = (fields);

            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await receipt.create({
                emi_id : "2",
                admin_id : "2",
                extra_charge : ReceiptInfo.extra_charge
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


// 2 . Get all Receipt
const getallReceipt = catchAsyncErrors(async (req, res, next) => {

    const AllReceipt = await receipt.findAll()

    res.status(200).json({
        AllReceipt: AllReceipt,
        success: true,
        message: "All Receipt"
    })
})

// 3 . Get Single Receipt
const getSingleReceipt = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleReceipt = await receipt.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleReceipt: SingleReceipt,
        success: true,
        message: "One Receipt Details"
    })
})

// 4 . Update receipt
const updateReceipt = catchAsyncErrors(async (req, res, next) => {
    
    const { id } = req.params

    const updateReceiptDetails = await receipt.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateReceiptDetails: updateReceiptDetails,
        success: true,
        message: "Receipt details updated"
    })
})

// 5 . Delete Receipt
const deleteReceiptDetails = catchAsyncErrors(async (req, res, next) => {
    
    const { id } = req.params

    const DeleteReceiptDetails = await receipt.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteReceiptDetails : DeleteReceiptDetails,
        success: true,
        message: "Receipt deleted successfully"
    })

})



module.exports = {
    AddReceipt,
    getallReceipt,
    getSingleReceipt,
    updateReceipt,
    deleteReceiptDetails
};
