const express = require("express");
const {
    AddDocument,
    // getallEmis,
    // getSingleEmi,
    // updateEmiDetails,
    // deleteEmiDetails 
} = require("../../routes/document/document.controller")

const router = express.Router();

router.post("/adddocument", AddDocument)
// router.get("/" , getallEmis)
// router.get("/details/:id" , getSingleEmi)
// router.put("/update/:id" , updateEmiDetails)
// router.delete("/delete/:id" , deleteEmiDetails)



module.exports = router;
