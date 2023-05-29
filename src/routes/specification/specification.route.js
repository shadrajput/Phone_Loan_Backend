const express = require("express");
const { AddSpecification , getallSpecification , getSingleSpecification , updateSpecificationDetails , deleteSpecificationDetails } = require("../../routes/specification/specification.controller")

const router = express.Router();

router.post("/addspecification" , AddSpecification)
router.get("/:id" , getallSpecification)
router.get("/details/:id" , getSingleSpecification)
router.put("/update/:id" , updateSpecificationDetails)
router.delete("/delete/:id" , deleteSpecificationDetails)

module.exports = router;
