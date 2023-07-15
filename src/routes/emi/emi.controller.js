const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const {Op } = require('sequelize');
const db = require('../../../models')
const { emi, purchase, customer, specification, phone, company,  receipt, installment, transaction } = require("../../../models")


// Add Emi
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

// Get all Emi
const getallEmi = catchAsyncErrors(async (req, res, next) => {

    const AllEmi = await emi.findAll()

    res.status(200).json({
        AllEmi: AllEmi,
        success: true,
        message: "All Emi"
    })
})


const getPendingEmi = catchAsyncErrors(async (req, res, next) => {

    let page = req.params.pageNo
    const itemsPerPage = 10
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
        include: [
            {
                model: purchase,
                include: [
                    customer,
                    installment,
                    {
                        model: specification,
                        include : [
                            {
                                model: phone,
                                include: company
                            }
                        ],
                        
                    }
                ]
            }
        ]
    })

    const totalPendingEMI = await emi.findOne({
         attributes: [
            [db.sequelize.fn('SUM', db.sequelize.literal('amount')), 'totalPendingAmount'],
        ],
        where:{
            status: 'pending'
        },
        raw: true // To retrieve JavaScript objects
    })

    let filteredCustomers = []
    const findCustomerInArray = (item) => {
        return filteredCustomers.find(emi => {
            return emi.purchase.customer.id == item.purchase.customer.id
        })
    }

    pendingEmi.filter((item) => {
        if (!findCustomerInArray(item)) {
            filteredCustomers.push(item)
        }
    })

    const todaysCollection = await transaction.findAll({
        attributes: [[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'amount']],
        where: db.sequelize.where(
            db.sequelize.fn('DATE', db.sequelize.col('createdAt')),
            db.sequelize.literal(`DATE('${currentDate.toISOString().split('T')[0]}')`)
        ),
        raw: true // To retrieve JavaScript objects
    });

    const sumAmount = todaysCollection[0].amount || 0;

    const totalCustomer = await emi.count();

    res.status(200).json({
        todaysCollection: sumAmount,
        totalPendingCustomers: filteredCustomers.length,
        totalModels: pendingEmi.length,
        totalPendingPayment: totalPendingEMI.totalPendingAmount,
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
                    {
                        model: specification,
                        include: phone
                    }
                ]
            },
            {
                model: receipt,
            }
        ]
    })

    res.status(200).json({
        AllEmi: AllEmi,
        success: true,
        message: "All Emi"
    })
})

// 4 . Get EMI BY Customer Name 
const getemibycustomername = catchAsyncErrors(async (req, res, next) => {
    let CustomerName = req.params.search;

    let page = req.params.pageNo
    const itemsPerPage = 10

    try {
        const SingleCustomerEMIDetails = await emi.findOne({
            skip: page * itemsPerPage,
            take: itemsPerPage,
            where: {
                status: 'pending'
            },
            order: [['due_date', 'ASC']],
            include: [
                {
                    model: purchase,
                    include: [
                        installment,
                        {
                            model: customer,
                            where: {
                                [Op.or]: [
                                    {
                                        full_name: CustomerName,
                                    },
                                    {
                                        mobile: CustomerName,

                                    }
                                ]
                            }
                        },
                        {
                            model: specification,
                            include:{
                                model: phone,
                                include: [company]
                            }
                        }
                    ]
                },
            ],

        });

        const totalCustomer = await customer.count();

        res.status(200).json({
            data: SingleCustomerEMIDetails,
            pageCount: Math.ceil(totalCustomer / itemsPerPage),
            success: true,
        });
    } catch (error) {
        next(error);
    }
});

// Get Single Emi
const getSingleEmi = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleEmi = await emi.findOne(
        {
            where: {
                id: Number(id)
            },
            include: [
                {
                    model: purchase,
                    include: [
                        installment,
                        customer,
                        {
                            model: specification,
                            include:{
                                model: phone,
                                include: [company, specification]
                            }
                        }
                    ]
                }]
        }
    )

    const Specifications = await specification.findOne({
            where: {
                id: SingleEmi.purchase.specification_id
            }
    });


    res.status(200).json({
        SingleEmi: SingleEmi,
        Specifications: Specifications,
        success: true,
        message: "One EMI Details"
    })
})

// Search EMI customer
const getEMICustomers = catchAsyncErrors(async (req, res, next) => {
    const {pageNo, searchedValue} = req.params;
    const itemsPerPage = 10;

    const { count, rows: emiDetails } = await customer.findAndCountAll({
        skip: pageNo * itemsPerPage,
        take: itemsPerPage,
        where:{
            [Op.or]:[
                {
                    full_name: {
                        [Op.like]: `%${searchedValue}%`
                    }
                },
                {
                    mobile: searchedValue
                }

            ]
        },
        include: [
            {
                model: purchase,
                include: [
                    installment,
                    {
                        model: emi,
                        where:{
                            status: 'pending',
                        },
                        order: [['createdAt', 'ASC']],
                        limit: 1,
                    },
                    {
                        model: specification,
                        include:{
                            model: phone,
                            include: company
                        }
                    }
                ]
            },
        ]
    })

    let filteredCustomers = JSON.parse(JSON.stringify(emiDetails));
    filteredCustomers = filteredCustomers.filter((item)=>{
        item.purchases.splice(0);
        return true;
    });

    const findCustomerInArray = (data)=>{
        if(data.emis.length > 0) return true;
        else return false;
    }

    emiDetails.map((item, i)=>{
        item.purchases.map((data)=>{
            if(findCustomerInArray(data)){
                filteredCustomers[i].purchases.push(data)
            }
        })
    })


    res.status(200).json({
        success: true, 
        emiDetails : filteredCustomers,
        totalPages : Math.ceil( count / itemsPerPage )
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
    getEMICustomers,
    updateEmi,
    deleteEmiDetails,
    getemibycustomername
};
