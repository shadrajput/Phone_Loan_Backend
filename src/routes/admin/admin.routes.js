const express = require("express");
const {AddAdmin , getallAdmin , getSingleAdmin ,  updateAdminDetails , deleteAdminDetails} = require("../../routes/admin/admin.controller")
const router = express.Router();

router.post("/addadmin" , AddAdmin)
router.get("/" , getallAdmin)
router.get("/details/:id" , getSingleAdmin)
router.put("/update" , updateAdminDetails)
router.delete("/delete/:id" , deleteAdminDetails)

module.exports = router;
