const express =
  require("express");

const router =
  express.Router();

const {
  getCentralDashboard,
  getHospitalDashboard,
} = require(
  "../controllers/dashboardController"
);

router.get(
  "/central",
  getCentralDashboard
);

router.get(
  "/hospital/:id",
  getHospitalDashboard
);

module.exports =
  router;