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

// // 2 . Get all EMIS
// const getallEmis = catchAsyncErrors(async (req, res, next) => {

//     const AllNews = await emi.findAll()

//     res.status(200).json({
//         AllNews: AllNews,
//         success: true,
//         message: "All EMI"
//     })
// })

// // 3 . Get Single EMI
// const getSingleEmi = catchAsyncErrors(async (req, res, next) => {

//     const { id } = req.params

//     const SingleEMI = await emi.findOne({
//         where: {
//             id: Number(id)
//         }
//     })

//     res.status(200).json({
//         SingleEMI: SingleEMI,
//         success: true,
//         message: "One EMI Details"
//     })
// })

// // 4 . Update EMI
// const updateEmiDetails = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params

//     const updateEmiDetails = await emi.update(req.body, {
//         where: {
//             id: Number(id)
//         },
//     })

//     res.status(200).json({
//         updateEmiDetails: updateEmiDetails,
//         success: true,
//         message: "News details updated"
//     })
// })

// // 5 . Delete EMI

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
    // getallEmis,
    // getSingleEmi,
    // updateEmiDetails,
    // deleteEmiDetails
};
