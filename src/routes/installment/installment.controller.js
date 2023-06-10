const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const { installment } = require("../../../models")
const formidable = require("formidable")


// 1 . Add Installment
const AddInstallment = async (req, res, next) => {
    try {
        const result = await installment.findOne({
            where: {
                month: req.body.month,
            },
        });

        if (result) {
            return res.status(400).json({ success: false, message: "Installment Exist Already" });
        }

        const data = await installment.create({
            month: req.body.month,
            charges: req.body.charges
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Installment added successfully",
        });
    } catch (error) {
        next(error)
    }
}

// 2 . Get all InstallmentS
const getallInstallment = catchAsyncErrors(async (req, res, next) => {

    const AllInstallment = await installment.findAll()

    res.status(200).json({
        AllInstallment: AllInstallment,
        success: true,
        message: "All Installment"
    })
})

// 3 . Get Single Installment
const getSingleInstallment = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleInstallment = await installment.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleInstallment: SingleInstallment,
        success: true,
        message: "One Installemnt Details"
    })
})

// 4 . Update Installment
const updateInstallmentDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params
    
    const updateInstallmentDetails = await installment.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateInstallmentDetails: updateInstallmentDetails,
        success: true,
        message: "News details updated"
    })
})

// 5 . Delete Installment

const deleteInstallmentDetails = catchAsyncErrors(async (req, res, next) => {
    console.log(req)
    const { id } = req.params
    const DeleteInstallmentDetails = await installment.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteInstallmentDetails: DeleteInstallmentDetails,
        success: true,
        message: "Installment deleted successfully"
    })

})



module.exports = {
    AddInstallment,
    getallInstallment,
    getSingleInstallment,
    getSingleInstallment,
    updateInstallmentDetails,
    deleteInstallmentDetails
};
