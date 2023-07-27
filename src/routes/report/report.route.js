const express = require("express");
const {
  getReport,
  getMonthWiseReport
} = require("./report.controller")

const router = express.Router();

router.get("/", getReport)
router.get("/month", getMonthWiseReport)

module.exports = router