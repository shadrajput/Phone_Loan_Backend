const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { Op } = require('sequelize');
const { phone } = require("../../../models")
const { company } = require("../../../models")

// 1 . Add Model
const AddModel = async (req, res, next) => {


    const Company = await company.findOne({
        where: {
            company_name: req.body.company_name
        },
    });

    const Model = await phone.findOne({
        where: {
            model_name: req.body.model_name,
            company_id: Company.id
        }
    });

    if (Model) {
        return res.status(500).json({ success: false, message: "Model Allready Exist " });
    }

    const data = await phone.create({
        model_name: req.body.model_name,
        company_id: Company.id
    });

    res.status(201).json({
        data: data,
        success: true,
        message: "Model Add Successfully",
    });

}

// 2 . Get all Models
const getallModel = catchAsyncErrors(async (req, res, next) => {
  
    let page = req.params.pageNo
    const itemsPerPage = 10

    const AllModel = await phone.findAll({
        skip: page * itemsPerPage,
        take: itemsPerPage,
        include: [company]
    })
   
    const totalModel = await phone.count();

    res.status(200).json({
        AllModel: AllModel,
        pageCount: Math.ceil(totalModel / itemsPerPage),
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

    const Company = await company.findOne({
        where: {
            company_name: req.body.company_name
        },
    });

    console.log(Company.id);
    const updateModelDetails = await phone.update(
        {
            model_name: req.body.model_name,
            company_id: Company.id
        },
        {
            where: {
                id: req.body.id,
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

const searchPhone = catchAsyncErrors(async (req, res, next) => {

    const { model } = req.params;

    const modelDetails = await phone.findAll({
        where: {
            model_name: {
                [Op.like]: `%${model}%`
            }
        },
        include: [company]
    })

    res.status(200).json({
        modelDetails: modelDetails,
        success: true,
    })

})



module.exports = {
    AddModel,
    getallModel,
    getSingleModel,
    updateModelDetails,
    deleteModelDetails,
    searchPhone
};