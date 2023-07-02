const express = require("express");
const {
    AddEmi,
    getallEmi,
    getPendingEmi,
    getEmiByPurchaseId,
    getSingleEmi,
    getEMICustomers,
    updateEmi,
    deleteEmiDetails,
    getemibycustomername
} = require("../../routes/emi/emi.controller")

const router = express.Router();

router.post("/addemi", AddEmi)
router.get("/", getallEmi)
router.get("/pending/:pageNo", getPendingEmi)
router.get("/Emi_details/:id", getEmiByPurchaseId)
router.get("/details/:id" , getSingleEmi)
router.put("/update/:id" , updateEmi)
router.get("/search/:pageNo/:searchedValue" , getEMICustomers)
router.delete("/delete/:id" , deleteEmiDetails)


module.exports = router;
