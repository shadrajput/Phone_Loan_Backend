const express = require("express");
const {
    AddReceipt,
    getallReceipt,
    getSingleReceipt,
    updateReceipt,
    deleteReceiptDetails,
    onerecieptDetailsbyNumber,
    getReceiptbyPurchaseId
} = require("../../routes/receipt/receipt.controller")

const router = express.Router();

router.post("/addreceipt", AddReceipt)
router.get("/search/:pageNo/:search", onerecieptDetailsbyNumber)
router.get("/search/:id", getReceiptbyPurchaseId)
router.get("/List/:pageNo", getallReceipt)
router.get("/details/:id", getSingleReceipt)
router.put("/update/:id", updateReceipt)
router.delete("/delete/:id", deleteReceiptDetails)



module.exports = router;
