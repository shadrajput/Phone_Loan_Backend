const express = require("express");
const {AddCompany} = require("./company.controller")

const router = express.Router();

router.post("/addcompany" , AddCompany)

module.exports = router;
