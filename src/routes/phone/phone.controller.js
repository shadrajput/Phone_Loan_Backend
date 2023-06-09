const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { phone } = require("../../../models")
const { company } = require("../../../models")

// 1 . Add Model
const AddModel = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {

        const Phone = (fields);

        const Company = await company.findOne({
            where: {
                company_name: Phone.company_name
            },
        });

        const Model = await phone.findOne({
            where: {
                model_name: Phone.model_name
            },
        });

        if (Model) {
            return res.status(500).json({ success: false, message: "Model Allready Exist " });
        }

        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        const data = await phone.create({
            model_name: Phone.model_name,
            company_id: Company.id
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Model Add Successfully",
        });

    });

}

// 2 . Get all Models
const getallModel = catchAsyncErrors(async (req, res, next) => {

    const AllModel = await phone.findAll({ include: [company] })

    res.status(200).json({
        AllModel: AllModel,
        success: true,
        message: "All Models"
    })
})

// 3 . Get Single Model
const getSingleModel = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleModel = await phone.findOne({
        where: {
            id: Number(id)
        },
        include: [company]
    })

    res.status(200).json({
        SingleModel: SingleModel,
        success: true,
        message: "One Model Details"
    })
})

// 4 . Update Model
const updateModelDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const updateModelDetails = await phone.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateModelDetails: updateModelDetails,
        success: true,
        message: "Model details updated"
    })
})

// 5 . Delete Model
const deleteModelDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params
    console.log(id)
    const DeleteModelDetails = await phone.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteModelDetails: DeleteModelDetails,
        success: true,
        message: "Model deleted successfully"
    })

})



module.exports = {
    AddModel,
    getallModel,
    getSingleModel,
    updateModelDetails,
    deleteModelDetails
};