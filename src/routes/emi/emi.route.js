const express = require("express");
const {
    AddEmi,
    getallEmi,
    getEmiByPurchaseId,
    getSingleEmi,
    updateEmi,
    deleteEmiDetails 
} = require("../../routes/emi/emi.controller")

const router = express.Router();

router.post("/addemi", AddEmi)
router.get("/", getallEmi)
router.get("/Emi_details/:id", getEmiByPurchaseId)
router.get("/details/:id" , getSingleEmi)
router.put("/update/:id" , updateEmi)
router.delete("/delete/:id" , deleteEmiDetails)



module.exports = router;
