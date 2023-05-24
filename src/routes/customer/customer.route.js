const express = require("express");
const {
    AddCustomer,
    getallCustomers,
    getSingleCustomer,
    updateCustomerDetails,
    deleteCustomerDetails 
} = require("../../routes/customer/customer.controller")

const router = express.Router();

router.post("/addcustomer", AddCustomer)
router.get("/", getallCustomers)
router.get("/details/:id" , getSingleCustomer)
router.put("/update/:id" , updateCustomerDetails)
router.delete("/delete/:id" , deleteCustomerDetails)



module.exports = router;
