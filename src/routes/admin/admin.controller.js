const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const { admin } = require("../../../models")
const formidable = require("formidable")


// 1 . Add Admin
const AddAdmin = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        console.log(fields)
        try {
            const AdminInfo = (fields);
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            const data = await admin.create(AdminInfo);

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
const getallAdmin = catchAsyncErrors(async (req, res, next) => {

    const AllAdmin = await admin.findAll()

    res.status(200).json({
        AllAdmin: AllAdmin,
        success: true,
        message: "All Admin"
    })
})

// // 3 . Get Single Admin
const getSingleAdmin = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleAdmin = await admin.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleAdmin: SingleAdmin,
        success: true,
        message: "One Admin Details"
    })
})

// // 4 . Update Admin
const updateAdminDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const updateAdminDetails = await admin.update(req.body , {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateAdminDetails: updateAdminDetails,
        success: true,
        message: "Admin details updated"
    })
})

// // 5 . Delete EMI

const deleteAdminDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const DeleteAdminDetails = await admin.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteAdminDetails : DeleteAdminDetails,
        success: true,
        message: "News deleted successfully"
    })

})



module.exports = {
    AddAdmin,
    getallAdmin,
    getSingleAdmin,
    updateAdminDetails,
    deleteAdminDetails
};