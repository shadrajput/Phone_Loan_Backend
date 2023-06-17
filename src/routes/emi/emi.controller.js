const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { emi , purchase , customer , phone , installment } = require("../../../models")


// 1 . Add Emi
const AddEmi = async (req, res, next) => {

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        try {

            const EmiInfo = (fields);

            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await emi.create({
                amount: EmiInfo.amount,
                due_date: EmiInfo.due_date,
                paid_date: EmiInfo.paid_date,
                status: EmiInfo.status,
                type: EmiInfo.type,
                purchase_id: "6"

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


// 2 . Get all Emi
const getallEmi = catchAsyncErrors(async (req, res, next) => {

    const AllEmi = await emi.findAll()

    res.status(200).json({
        AllEmi: AllEmi,
        success: true,
        message: "All Emi"
    })
})

// 3 . Get all Emi By Purchase Id 
const getEmiByPurchaseId = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const AllEmi = await emi.findAll({
        where: {
            purchase_id : Number(id)
        },
        include : [
            {
                model : purchase,
                include : [
                    customer ,
                    installment , 
                    phone
                ]
            }
        ]
    })

    res.status(200).json({
        AllEmi: AllEmi,
        success: true,
        message: "All Emi"
    })
})



// 3 . Get Single Emi
const getSingleEmi = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleEmi = await emi.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleEmi: SingleEmi,
        success: true,
        message: "One EMI Details"
    })
})

// 4 . Update Emi
const updateEmi = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const updateEmiDetails = await emi.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateEmiDetails: updateEmiDetails,
        success: true,
        message: "Emi details updated"
    })
})

// 5 . Delete Emi
const deleteEmiDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const DeleteEmiDetails = await emi.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteEmiDetails: DeleteEmiDetails,
        success: true,
        message: "Emi deleted successfully"
    })

})



module.exports = {
    AddEmi,
    getallEmi,
    getEmiByPurchaseId,
    getSingleEmi,
    updateEmi,
    deleteEmiDetails
};
