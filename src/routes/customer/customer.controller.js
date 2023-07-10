const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { Op } = require('sequelize');
const { customer } = require("../../../models")
const { document } = require("../../../models")
const { installment } = require("../../../models")

const {
    uploadImage,
    deleteImage,
    customerProfileDefaultImage,
    adharFrontDefaultImage,
    adharBackDefaultImage,
    pancardDefaultImage,
    lightBillDefaultImage
} = require("../../helper/imageUpload")


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

        let adhar_front = "";
        adhar_front = await upload_image(files?.adhar_front, adhar_front, adharFrontDefaultImage, 'phone_document');
        let adhar_back = "";
        adhar_back = await upload_image(files?.adhar_back, adhar_back, adharBackDefaultImage, 'phone_document');
        let pancard = "";
        pancard = await upload_image(files?.pancard, pancard, pancardDefaultImage, 'phone_document');
        let lightbill = "";
        lightbill = await upload_image(files?.light_bill, lightbill, lightBillDefaultImage, 'phone_document');

        const Document = await document.create({
            adhar_front: adhar_front == '' ? adharFrontDefaultImage : adhar_front,
            adhar_back: adhar_back == '' ? adharBackDefaultImage  : adhar_back ,
            pancard: pancard == '' ? pancardDefaultImage : pancard,
            lightbill: lightbill == '' ? lightBillDefaultImage : lightbill
        });

        let photo = "";
        photo = await upload_image(files?.photo, photo, customerProfileDefaultImage, 'phone_customer_profile');

        const data = await customer.create({
            photo: photo == '' ? customerProfileDefaultImage : photo,
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
    const { pageNo, searchedValue } = req.params
    const itemsPerPage = 10;
    const { count, rows: AllCustomer } = await customer.findAndCountAll({
        skip: pageNo * itemsPerPage,
        take: itemsPerPage,
        where: {
            [Op.or]: [
                {
                    full_name: {
                        [Op.like]: `%${searchedValue}%`
                    }
                },
                {
                    mobile: searchedValue
                }
            ]
        }
    })

    res.status(200).json({
        AllCustomer: AllCustomer,
        totalPages: Math.ceil(count / itemsPerPage),
        success: true,
        message: "All Customer"
    })
})

// // 3 . Get Single Customer
const getSingleCustomer = catchAsyncErrors(async (req, res, next) => {
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
        let id = fields.id;

        let adhar_front = fields.old_adhar_front_url;
        adhar_front = await upload_image(files?.adhar_front, adhar_front, adharFrontDefaultImage, 'phone_document');

        let adhar_back = fields.old_adhar_back_url;
        adhar_back = await upload_image(files?.adhar_back, adhar_back, adharBackDefaultImage, 'phone_document');

        let pancard = fields.old_pancard_url;
        pancard = await upload_image(files?.pancard, pancard, pancardDefaultImage, 'phone_document');

        let lightbill = fields.old_light_bill_url;
        lightbill = await upload_image(files?.light_bill, lightbill, lightBillDefaultImage, 'phone_document');


        const customerDetails = await customer.findOne({ where: { id: Number(id) } });

        const Document = await document.update(
            {
                adhar_front: adhar_front,
                adhar_back: adhar_back,
                pancard: pancard,
                light_bill: lightbill
            },
            {
                where: {
                    id: customerDetails.document_id
                },
            }
        );

        let photo = fields.old_photo_url;
        photo = await upload_image(files?.photo, photo, customerProfileDefaultImage, 'phone_customer_profile');

        const updateCustomerDetails = await customer.update(
            {
                photo: photo,
                full_name: fields.full_name,
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


const searchCustomer = catchAsyncErrors(async (req, res, next) => {

    const { CustomerName } = req.params;

    const CustomerDetails = await customer.findAll({
        where: {
            full_name: {
                [Op.like]: `%${CustomerName}%`
            }
        },
    })

    res.status(200).json({
        CustomerDetails: CustomerDetails,
        success: true,
    })

})


// Image Upload
async function upload_image(file, image, default_image, folder) {
    if (!file) {
        return image.length <= 2 ? default_image : image;
    }

    try {
        if (image && image != default_image) {
            await deleteImage(image);
        }
        return await uploadImage(file, folder);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    AddCustomer,
    getallCustomers,
    getSingleCustomer,
    updateCustomerDetails,
    deleteCustomerDetails,
    searchCustomer
};
