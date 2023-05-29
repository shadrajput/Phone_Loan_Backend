const express = require("express");
const {
    AddReceipt,
    getallReceipt,
    getSingleReceipt,
    updateReceipt,
    deleteReceiptDetails 
} = require("../../routes/receipt/receipt.controller")

const router = express.Router();

router.post("/addreceipt", AddReceipt)
router.get("/:search", getallReceipt)
router.get("/details/:id" , getSingleReceipt)
router.put("/update/:id" , updateReceipt)
router.delete("/delete/:id" , deleteReceiptDetails)



module.exports = router;
