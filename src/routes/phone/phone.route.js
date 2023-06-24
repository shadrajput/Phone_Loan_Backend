const express = require("express");
const {AddModel , getallModel , getSingleModel , updateModelDetails , deleteModelDetails} = require("../../routes/phone/phone.controller")

const router = express.Router();

router.post("/addphone" , AddModel)
router.get("/List/:pageNo" , getallModel)
router.get("/details/:id" , getSingleModel)
router.put("/update/:id" , updateModelDetails)
router.delete("/delete/:id" , deleteModelDetails)

module.exports = router;
