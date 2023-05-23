const express = require("express");
const {AddEmi , getallEmis , getSingleEmi , updateEmiDetails , deleteEmiDetails} = require("../../routes/emis/emis.controller")

const router = express.Router();

router.post("/addemi" , AddEmi)
router.get("/" , getallEmis)
router.get("/details/:id" , getSingleEmi)
router.put("/update/:id" , updateEmiDetails)
router.delete("/delete/:id" , deleteEmiDetails)



module.exports = router;
