const express = require("express");
const {AddCompany} = require("../../routes/company/company.controller")

const router = express.Router();

router.post("/addcompany" , AddCompany)

module.exports = router;
