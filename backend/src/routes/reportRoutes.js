const express =
  require("express");

const router =
  express.Router();

const {
  getAllocationReport,
  getConsumptionReport,
} = require(
  "../controllers/reportController"
);

router.get(
  "/allocation",
  getAllocationReport
);

router.get(
  "/consumption",
  getConsumptionReport
);

module.exports =
  router;