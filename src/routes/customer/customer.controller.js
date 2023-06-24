const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { customer } = require("../../../models")
const { document } = require("../../../models")
const { installment } = require("../../../models")
const { uploadImage } = require("../../helper/imageUpload")


// 1 . Add Customer
const AddCustomer = catchAsyncErrors(async (req, res, next) => {

    const form = new formidable.IncomingForm();

    form.parse(req, async function (err, fields, files) {
        console.log(fields)
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

        let adhar_front = "";
        adhar_front = await upload_Adhar_front(files, adhar_front);
        let adhar_back = "";
        adhar_back = await upload_Adhar_back(files, adhar_back);
        let pancard = "";
        pancard = await upload_pancard(files, pancard);
        let lightbill = "";
        lightbill = await upload_lightbill(files, lightbill);

        const Document = await document.create({
            adhar_front: adhar_front,
            adhar_back: adhar_back,
            pancard: pancard,
            lightbill: lightbill
        });

        let photo = "";
        photo = await upload_photo(files, photo);

        const data = await customer.create({
            photo: photo,
            full_name: CustomerInfo.full_name,
            mobile: CustomerInfo.mobile,
            alternate_no: CustomerInfo.alternate_no,
            reference_name: CustomerInfo.reference_name,
            reference_mobile: CustomerInfo.reference_mobile,
            document_id: Document.id
        });

        res.status(201).json({
            data: data, Document,
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
    console.log(req.params)
    const { id } = req.params

    const SingleCustomer = await customer.findOne({
        where: {
            id: Number(id)
        },
        include: [document]
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

        let id = fields.id
        let Document_id = fields.document_id
        let adhar_front = "";
        adhar_front = await upload_Adhar_front(files, adhar_front);
        let adhar_back = "";
        adhar_back = await upload_Adhar_back(files, adhar_back);
        let pancard = "";
        pancard = await upload_pancard(files, pancard);
        let lightbill = "";
        lightbill = await upload_lightbill(files, lightbill);

        const Document = await document.update(
            {
                adhar_front: adhar_front,
                adhar_back: adhar_back,
                pancard: pancard,
                lightbill: lightbill
            },
            {
                where: {
                    id: Number(Document_id)
                },
            }
        );

        let photo = "";
        photo = await upload_photo(files, photo);

        const updateCustomerDetails = await customer.update(
            {
                photo: photo,
                first_name: fields.first_name,
                last_name: fields.last_name,
                mobile: fields.mobile,
                alternate_no: fields.alternate_no,
                reference_name: fields.reference_name,
                reference_mobile: fields.reference_mobile
            },
            {
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

async function upload_photo(files, photo) {
    if (!files || !files.photo) {
        return photo ? photo : "";
    }

    try {
        return await uploadImage(files.photo, "customer");
    } catch (error) {
        throw new Error(error.message);
    }
}


// Image Upload
async function upload_Adhar_front(files, adhar_front) {
    if (!files || !files.adhar_front) {
        return adhar_front ? adhar_front : "";
    }
    try {
        return await uploadImage(files.adhar_front, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}

async function upload_Adhar_back(files, adhar_back) {
    if (!files || !files.adhar_back) {
        return adhar_back ? adhar_back : "";
    }

    try {
        return await uploadImage(files.adhar_back, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}

async function upload_pancard(files, pancard) {
    if (!files || !files.pancard) {
        return pancard ? pancard : "";
    }

    try {
        return await uploadImage(files.pancard, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}

async function upload_lightbill(files, lightbill) {
    if (!files || !files.lightbill) {
        return lightbill ? lightbill : "";
    }

    try {
        return await uploadImage(files.lightbill, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {
    AddCustomer,
    getallCustomers,
    getSingleCustomer,
    updateCustomerDetails,
    deleteCustomerDetails
};
