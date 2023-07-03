const express = require("express");
const {AddCompany , getallCompany , getSingleCompany , updateCompanyDetails , deleteCompany} = require("./company.controller")

const router = express.Router();

router.post("/addcompany" , AddCompany)
router.get("/" , getallCompany)
router.get("/details/:id" , getSingleCompany)
router.put("/update/:id" , updateCompanyDetails)
router.delete("/delete/:id" , deleteCompany)

module.exports = router;
