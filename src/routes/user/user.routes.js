const express = require('express');
const router = express.Router()
const {
    userSignup,
    userLogin,
    userDetail,
    // updateCustomerDetails,
    // deleteCustomerDetails 
} = require("../../routes/user/user.controller")


router.post('/Usersignup', userSignup)
router.post('/login', userLogin)
router.get('/detail', userDetail)


module.exports = router