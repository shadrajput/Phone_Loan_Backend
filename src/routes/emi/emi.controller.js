const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const {Op } = require('sequelize');
const db = require('../../../models')
const { emi, purchase, customer, phone, receipt, installment, transaction } = require("../../../models")


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

const getPendingEmi = catchAsyncErrors(async (req, res, next) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear();
    const pendingEmi = await emi.findAll({ 
        where:{
            [Op.and]: [
                db.sequelize.where(db.sequelize.literal('MONTH(due_date)'), currentMonth),
                db.sequelize.where(db.sequelize.literal('YEAR(due_date)'), currentYear),
                { status: 'pending' }
            ]  
        },
        include:[
             {
                model: purchase,
                include: [
                    customer,
                    installment,
                    phone
                ]
            }
        ]
    })

    let filteredCustomers = []
    const findCustomerInArray = (item)=>{
        return filteredCustomers.find( emi =>{
            return emi.purchase.customer.id == item.purchase.customer.id
        })
    }

    pendingEmi.filter((item)=>{
        if(!findCustomerInArray(item)){
            filteredCustomers.push(item)
        }
    })

    const todaysCollection = await transaction.findAll({
        attributes: [[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'amount']],
        where: db.sequelize.where(
            db.sequelize.fn('DATE', db.sequelize.col('createdAt')),
            db.sequelize.literal(`DATE('${currentDate.toISOString().split('T')[0]}')`)
        ),
        raw: true // To retrieve plain JavaScript objects
    });

    const sumAmount = todaysCollection[0].amount || 0;

    res.status(200).json({
        todaysCollection: sumAmount,
        totalPendingCustomers: filteredCustomers.length,
        totalModels: pendingEmi.length,
        pendingEmiCustomers: filteredCustomers,
        success: true,
    })
})

// Get all Emi By Purchase Id 
const getEmiByPurchaseId = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const AllEmi = await emi.findAll({
        where: {
            purchase_id: Number(id)
        },
        include: [
            {
                model: purchase,
                include: [
                    customer,
                    installment,
                    phone
                ]
            }
        ]
    })

    // const AllReceipt = await receipt.findAll({
    //     include: [{
    //         model: emi,
    //         where: {
    //             purchase_id: Number(id)
    //         }
    //     }]
    // })

    res.status(200).json({
        AllEmi: AllEmi,
        success: true,
        message: "All Emi"
    })
})

// Get Single Emi
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

// Update Emi
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

// Delete Emi
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
    getPendingEmi,
    getEmiByPurchaseId,
    getSingleEmi,
    updateEmi,
    deleteEmiDetails
};
