const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { customer } = require("../../../models")
const { installment } = require("../../../models")


// 1 . Add Customer
const AddCustomer = catchAsyncErrors(async (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {

        const CustomerInfo = JSON.parse(fields.data).CustomerInfo;

        const result = await customer.findOne({
            where: {
                mobile: CustomerInfo.mobile
            },
        });

        if (result) {
            return res.status(400).json({ success: false, message: "Customer Exist Already" });
        }

        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        const data = await customer.create({
            first_name: CustomerInfo.first_name,
            last_name: CustomerInfo.last_name,
            mobile: CustomerInfo.mobile,
            alternate_no: CustomerInfo.alternate_no,
            reference_name: CustomerInfo.reference_name,
            reference_mobile: CustomerInfo.reference_mobile,
            document_id: "1"
        });

        res.status(201).json({
            data: data,
            success: true,
            message: "Customer added successfully",
        });
    });

})

// // 2 . Get all Customers
const getallCustomers = catchAsyncErrors(async (req, res, next) => {

    const AllCustomer = await customer.findAll()

    res.status(200).json({
        AllCustomer: AllCustomer,
        success: true,
        message: "All Customer"
    })
})

// // 3 . Get Single Customer
const getSingleCustomer = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params
    console.log(id)
    const SingleCustomer = await customer.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleCustomer: SingleCustomer,
        success: true,
        message: "One Customer Details"
    })
})

// // 4 . Update EMI
const updateCustomerDetails = catchAsyncErrors(async (req, res, next) => {

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        console.log(fields)
        // const customer_id = Number(req.params.tournament_id);
        const {
            id,
            first_name,
            last_name,
            mobile,
            alternate_no,
            reference_name,
            reference_mobile,
        } = fields;

        const updateCustomerDetails = await customer.update(fields, {
                where: {
                    id: Number(id)
                },
            })

        res.status(201).json({
            updateCustomerDetails: updateCustomerDetails,
            success: true,
            message: "Customer details updated"
        })
    })
})

// // 5 . Delete EMI

const deleteCustomerDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params

    const DeleteCustomerDetails = await customer.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteEmiDetails: DeleteCustomerDetails,
        success: true,
        message: "Customer deleted successfully"
    })

})



module.exports = {
    AddCustomer,
    getallCustomers,
    getSingleCustomer,
    updateCustomerDetails,
    deleteCustomerDetails
};
