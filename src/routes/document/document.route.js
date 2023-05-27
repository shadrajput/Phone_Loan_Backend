const express = require("express");
const {
    AddDocument,
    getallDocument,
    getSingleDocument,
    // updateDocumentDetails,
    deleteDocumentDetails 
} = require("../../routes/document/document.controller")

const router = express.Router();

router.post("/adddocument", AddDocument)
router.get("/" , getallDocument)
router.get("/details/:id" , getSingleDocument)
// router.put("/update/:id" , updateDocumentDetails)
router.delete("/delete/:id" , deleteDocumentDetails)



module.exports = router;
