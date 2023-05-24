const express = require("express");
const {
    AddCustomer,
    // getallEmis,
    // getSingleEmi,
    // updateEmiDetails,
    // deleteEmiDetails 
} = require("../../routes/customer/customer.controller")

const router = express.Router();

router.post("/addcustomer", AddCustomer)
// router.get("/" , getallEmis)
// router.get("/details/:id" , getSingleEmi)
// router.put("/update/:id" , updateEmiDetails)
// router.delete("/delete/:id" , deleteEmiDetails)



module.exports = router;
