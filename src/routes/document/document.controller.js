const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler");
const formidable = require("formidable")
const { document } = require("../../../models")
const { uploadImage } = require("../../helper/imageUpload")


// 1 . Add Document
const AddDocument = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        try {
            const documentInfo = (files);

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
            const data = await document.create({
                adhar_front: adhar_front,
                adhar_back: adhar_back,
                pancard: pancard,
                lightbill: lightbill
            });

            res.status(201).json({
                data: data,
                success: true,
                message: "Documents added successfully",
            });

        } catch (error) {
            next(error)
        }

    });

}

// // 2 . Get all Document
const getallDocument = catchAsyncErrors(async (req, res, next) => {

    const AllDocument = await document.findAll()

    res.status(200).json({
        AllDocument: AllDocument,
        success: true,
        message: "All Document"
    })
})

// // 3 . Get Single Document
const getSingleDocument = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params

    const SingleDocument = await document.findOne({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        SingleDocument: SingleDocument,
        success: true,
        message: "One Document Details"
    })
})

// // 4 . Update Document
// const updateDocumentDetails = catchAsyncErrors(async (req, res, next) => {
//     const form = new formidable.IncomingForm();
//     form.parse(req, async function (err, fields, files) {
//         let { id } = req.params

//         if (err) {
//             return res.status(500).json({ success: false, message: err.message });
//         }

//         let adhar_front = "";
//         adhar_front = await upload_Adhar_front(files, adhar_front);
//         let adhar_back = "";
//         adhar_back = await upload_Adhar_back(files, adhar_back);
//         let pancard = "";
//         pancard = await upload_pancard(files, pancard);
//         let lightbill = "";
//         lightbill = await upload_lightbill(files, lightbill);

//         const updateDocumentDetails = await document.update(
//             adhar_front,
//             adhar_back,
//             pancard,
//             lightbill,
//             {
//                 where: {
//                     id: Number(id)
//                 },

//             })

//         res.status(200).json({
//             updateDocumentDetails: updateDocumentDetails,
//             success: true,
//             message: "Document details updated"
//         })
//     })
// })


// // 5 . Delete Document
const deleteDocumentDetails = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const DeleteDocumentDetails = await document.destroy({
        where: {
            id: Number(id)
        }
    })

    res.status(200).json({
        DeleteDocumentDetails : DeleteDocumentDetails,
        success: true,
        message: "Document deleted successfully"
    })

})


// Image Upload
async function upload_Adhar_front(files) {
    try {
        return await uploadImage(files.adhar_front, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}

async function upload_Adhar_back(files) {
    try {
        return await uploadImage(files.adhar_back, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}

async function upload_pancard(files) {
    try {
        return await uploadImage(files.pancard, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}

async function upload_lightbill(files) {
    try {
        return await uploadImage(files.lightbill, "document");
    } catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {
    AddDocument,
    getallDocument,
    getSingleDocument,
    // updateDocumentDetails,
    deleteDocumentDetails
};
