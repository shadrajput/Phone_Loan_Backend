const express = require("express");
const {
    AddEmi,
    getallEmi,
    getSingleEmi,
    updateEmi,
    deleteEmiDetails 
} = require("../../routes/emi/emi.controller")

const router = express.Router();

router.post("/addemi", AddEmi)
router.get("/", getallEmi)
router.get("/details/:id" , getSingleEmi)
router.put("/update/:id" , updateEmi)
router.delete("/delete/:id" , deleteEmiDetails)



module.exports = router;
