const express = require("express");
const { AddInstallment,
    getallInstallment,
    getSingleInstallment,
    updateInstallmentDetails,
    deleteInstallmentDetails
} = require("./installment.controller");

const router = express.Router();

router.post("/addinstallemnt", AddInstallment)
router.get("/",getallInstallment)
router.get("/details/:id", getSingleInstallment)
router.put("/update/:id", updateInstallmentDetails)
router.delete("/delete/:id", deleteInstallmentDetails)



module.exports = router;
