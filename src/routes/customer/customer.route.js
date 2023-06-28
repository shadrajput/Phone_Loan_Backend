const express = require("express");
const {
    AddCustomer,
    getallCustomers,
    getSingleCustomer,
    updateCustomerDetails,
    deleteCustomerDetails,
    searchCustomer
} = require("../../routes/customer/customer.controller")

const router = express.Router();

router.post("/addcustomer", AddCustomer)
router.get("/search/:CustomerName" , searchCustomer)
router.get("/List/:pageNo", getallCustomers)
router.get("/details/:id" , getSingleCustomer)
router.put("/update" , updateCustomerDetails)
router.delete("/delete/:id" , deleteCustomerDetails)



module.exports = router;
