const express = require("express");
const {
    AddPurchase,
    getallPurchase,
    getSinglePurchase,
    getSinglePurchasebyCustomerId,
    updatePurchase,
    deletePurchaseDetails 
} = require("../../routes/purchase/purchase.controller")

const router = express.Router();

router.post("/addpurchase", AddPurchase)
router.get("/", getallPurchase)
router.get("/details/:id" , getSinglePurchase)
router.get("/Customer_details/:id" , getSinglePurchasebyCustomerId)
router.put("/update/:id" , updatePurchase)
router.delete("/delete/:id" , deletePurchaseDetails)



module.exports = router;
