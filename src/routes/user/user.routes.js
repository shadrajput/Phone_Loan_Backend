const express = require('express');
const router = express.Router()
const {
    userSignup,
    // userLogin,
    // getSingleCustomer,
    // updateCustomerDetails,
    // deleteCustomerDetails 
} = require("../../routes/user/user.controller")


router.post('/Usersignup', userSignup)
// router.post('/login', userLogin)


module.exports = router