const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const { emi } = require("../../../models")
const formidable = require("formidable")


// 1 . Add EMI
const AddEmi = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        try {
            const EMISInfo = (fields);
            console.log(EMISInfo)
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await emi.create(EMISInfo);

            res.status(201).json({
                data: data,
                success: true,
                message: "EMIS added successfully",
            });
        } catch (error) {
            next(error)
        }

    });

}

// 2 . Get all EMIS
const getallEmis = catchAsyncErrors(async (req, res, next) => {

    const AllNews = await emi.findAll()

    res.status(200).json({
        AllNews: AllNews,
        success: true,
        message: "All EMI"
    })
})

// 3 . Get Single EMI
const getSingleEmi = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleEMI = await emi.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleEMI: SingleEMI,
        success: true,
        message: "One EMI Details"
    })
})

// 4 . Update EMI
const updateEmiDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const updateEmiDetails = await emi.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateEmiDetails: updateEmiDetails,
        success: true,
        message: "News details updated"
    })
})

// 5 . Delete EMI

const deleteEmiDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const DeleteEmiDetails = await emi.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteEmiDetails : DeleteEmiDetails,
        success: true,
        message: "News deleted successfully"
    })

})



module.exports = {
    AddEmi,
    getallEmis,
    getSingleEmi,
    updateEmiDetails,
    deleteEmiDetails
};
