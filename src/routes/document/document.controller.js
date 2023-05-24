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
            adhar_front = await uploadphoto(files, adhar_front);
            console.log(adhar_front)
            const data = await document.create({
                adhar_front: documentInfo.adhar_front,
                adhar_back: documentInfo.adhar_back,
                pancard: documentInfo.pancard,
                lightbill: documentInfo.lightbill
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
async function uploaduploadLogo(files) {
    try {
        return await uploadImage(files.adhar_front, "document");
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
