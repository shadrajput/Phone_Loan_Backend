const express = require("express");
const { AddInstallment,
    getallInstallment,
    getCustomersByInstallment,
    getSingleInstallment,
    updateInstallmentDetails,
    deleteInstallmentDetails
} = require("./installment.controller");

const router = express.Router();

router.post("/addinstallment", AddInstallment)
router.get("/",getallInstallment)
router.get("/:installment_id",getCustomersByInstallment)
router.get("/details/:id", getSingleInstallment)
router.put("/update/:id", updateInstallmentDetails)
router.delete("/delete/:id", deleteInstallmentDetails)



module.exports = router;
