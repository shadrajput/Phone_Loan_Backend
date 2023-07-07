const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { company, phone } = require("../../../models")


// 1 . Add Company
const AddCompany = async (req, res, next) => {
    try {

        const Company = await company.findOne({
            where: {
                company_name: req.body.company_name
            },
        });

        if (Company) {
            return res.status(500).json({ success: false, message: "Company Allready Exist " });
        }

        const data = await company.create({
            company_name: req.body.company_name
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Company Added Successfully",
        });
    } catch (error) {
        next(error)
    }

}

// 2 . Get all Company
const getallCompany = catchAsyncErrors(async (req, res, next) => {

    const all_companies = await company.findAll({
        include: phone
    })

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
const deleteCompany = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const DeleteCompany = await company.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteCompany: DeleteCompany,
        success: true,
        message: "Company deleted successfully"
    })

})



module.exports = {
    AddCompany,
    getallCompany,
    getSingleCompany,
    updateCompanyDetails,
    deleteCompany
};
