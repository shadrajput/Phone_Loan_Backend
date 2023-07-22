const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const { installment, specification, purchase, customer, phone, company } = require("../../../models")
const formidable = require("formidable")


// 1 . Add Installment
const AddInstallment = async (req, res, next) => {

    try {
        const result = await installment.findOne({
            where: {
                month: req.body.month,
            },
        });

        if (result) {
            return res.status(400).json({ success: false, message: "Installment Exist Already" });
        }

        const data = await installment.create({
            month: req.body.month,
            charges: req.body.charges
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Installment added successfully",
        });
    } catch (error) {
        next(error)
    }
}

// 2 . Get all InstallmentS
const getallInstallment = catchAsyncErrors(async (req, res, next) => {

    const AllInstallment = await installment.findAll({
        include: [
            {
                model: purchase,
                include: [
                    {
                        model: customer
                    }
                ]
            }
        ],
    })

    let filteredCustomers = JSON.parse(JSON.stringify(AllInstallment));
    filteredCustomers = filteredCustomers.filter((item) => {
        item.purchases.splice(0);
        return true;
    });


    const findCustomerInArray = (data) => {
        for (let i = 0; i < filteredCustomers.length; i++) {
            let flag = 0;
            for (let j = 0; j < filteredCustomers[i].purchases.length; j++) {
                if (filteredCustomers[i].purchases[j].customer.id == data.customer.id) flag = 1;
            }

            if (flag) {
                return true
            }
            else {
                return false
            }
        }
    }

    AllInstallment.map((item, i) => {
        item.purchases.map((data) => {
            if (!findCustomerInArray(data)) {
                filteredCustomers[i].purchases.push(data)
            }
        })
    })


    res.status(200).json({
        AllInstallment: filteredCustomers,
        success: true,
        message: "All Installment"
    })
})

const getCustomersByInstallment = catchAsyncErrors(async (req, res, next) => {
    const { installment_id } = req.params
    const customers = await purchase.findAll({
        include: [
            {
                model: installment,
                where: {
                    id: installment_id
                }
            },
            {
                model: customer
            },
            {
                model: specification,
                include: {
                    model: phone,
                    include: [
                        {
                            model: company
                        }
                    ]
                }
            }
        ]
    })

    res.status(200).json({
        allCustomers: customers,
        success: true,
    })
})

// 3 . Get Single Installment
const getSingleInstallment = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleInstallment = await installment.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleInstallment: SingleInstallment,
        success: true,
        message: "One Installemnt Details"
    })
})

// 4 . Update Installment
const updateInstallmentDetails = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const updateInstallmentDetails = await installment.update(req.body, {
        where: {
            id: Number(id)
        },
    })

    res.status(200).json({
        updateInstallmentDetails: updateInstallmentDetails,
        success: true,
        message: "News details updated"
    })
})

// 5 . Delete Installment

const deleteInstallmentDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const DeleteInstallmentDetails = await installment.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteInstallmentDetails: DeleteInstallmentDetails,
        success: true,
        message: "Installment deleted successfully"
    })

})



module.exports = {
    AddInstallment,
    getallInstallment,
    getCustomersByInstallment,
    getSingleInstallment,
    getSingleInstallment,
    updateInstallmentDetails,
    deleteInstallmentDetails
};
