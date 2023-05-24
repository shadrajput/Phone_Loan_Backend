const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { specification } = require("../../../models")


// 1 . Add Company
const AddSpecification = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        try {
            
            const Specification = (fields);

            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await specification.create({
                ram : Specification.ram,
                storage : Specification.storage,
                price : Specification.price,
                phone_id : "1"
            });

            res.status(201).json({
                data: data,
                success: true,
                message: "Specification added successfully",
            });
        } catch (error) {
            next(error)
        }

    });

}

// 2 . Get all Specification
const getallSpecification = catchAsyncErrors(async (req, res, next) => {

    const AllSpecification = await specification.findAll()

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
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleSpecification: SingleSpecification,
        success: true,
        message: "One Specification Details"
    })
})

// 4 . Update Specification
const updateSpecificationDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

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
        DeleteSpecificationDetails : DeleteSpecificationDetails,
        success: true,
        message: "Specification deleted successfully"
    })

})



module.exports = {
    AddSpecification,
    getallSpecification,
    getSingleSpecification,
    updateSpecificationDetails,
    deleteSpecificationDetails
};
