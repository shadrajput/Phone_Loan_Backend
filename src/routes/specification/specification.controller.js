const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { specification } = require("../../../models")
const { phone } = require("../../../models")
const { company } = require("../../../models")

// 1 . Add Company
const AddSpecification = async (req, res, next) => {
    try {

        const data = await specification.create({
            ram: req.body.ram,
            storage: req.body.storage,
            price: req.body.price,
            phone_id: req.body.phone_id
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Specification added successfully",
        });
    } catch (error) {
        next(error)
    }
}

// 2 . Get all Specification
const getallSpecification = catchAsyncErrors(async (req, res, next) => {

    const AllSpecification = await specification.findAll({
        include: [{
            model: phone,
            include: [company]
        }]
    })

    res.status(200).json({
        AllSpecification: AllSpecification,
        success: true,
        message: "All Specification"
    })
})

const getallSpecificationById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const AllSpecification = await specification.findAll({
        where: {
            phone_id: Number(id)
        },
        include: [phone]
    })

    res.status(200).json({
        AllSpecification: AllSpecification,
        success: true,
        message: "All Specification"
    })
})


// 3 . Get Single Specification
const getSingleSpecification = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleSpecification = await specification.findOne({
        where: {
            phone_id: Number(id)
        },
        include: [phone]
    })

    res.status(200).json({
        SingleSpecification: SingleSpecification,
        success: true,
        message: "One Specification Details"
    })
})

// 4 . Update Specification
const updateSpecificationDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.body

    const updateSpecificationDetails = await specification.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateSpecificationDetails: updateSpecificationDetails,
        success: true,
        message: "Specification details updated"
    })
})

// 5 . Delete Specification
const deleteSpecificationDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const DeleteSpecificationDetails = await specification.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteSpecificationDetails: DeleteSpecificationDetails,
        success: true,
        message: "Specification deleted successfully"
    })

})



module.exports = {
    AddSpecification,
    getallSpecification,
    getallSpecificationById,
    getSingleSpecification,
    updateSpecificationDetails,
    deleteSpecificationDetails
};
