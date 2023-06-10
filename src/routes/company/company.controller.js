const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { company, phone } = require("../../../models")


// 1 . Add Company
const AddCompany = async (req, res, next) => {
    try {

        const Company = await company.findOne({
            company_name: req.body.company_name
        });
        
        if (Company) {
            return res.status(400).json({ success: false, message: "Company Exist Already" });
        }

        const data = await company.create({
            company_name: req.body.company
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "company added successfully",
        });
    } catch (error) {
        next(error)
    }

}

// 2 . Get all Company
const getallCompany = catchAsyncErrors(async (req, res, next) => {

    const all_companies = await company.findAll({ include: phone })

    res.status(200).json({
        all_companies: all_companies,
        success: true,
    })
})

// 3 . Get Single Company
const getSingleCompany = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleCompany = await company.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleEMI: SingleCompany,
        success: true,
        message: "One Company Details"
    })
})

// 4 . Update Company
const updateCompanyDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const updateCompanyDetails = await company.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateCompanyDetails: updateCompanyDetails,
        success: true,
        message: "Company details updated"
    })
})

// 5 . Delete EMI
// const deleteEmiDetails = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params
//     const DeleteEmiDetails = await emi.destroy({
//         where: {
//             id: Number(id)
//         }
//     })

//     res.status(200).json({
//         DeleteEmiDetails : DeleteEmiDetails,
//         success: true,
//         message: "News deleted successfully"
//     })

// })



module.exports = {
    AddCompany,
    getallCompany,
    getSingleCompany,
    updateCompanyDetails
};
