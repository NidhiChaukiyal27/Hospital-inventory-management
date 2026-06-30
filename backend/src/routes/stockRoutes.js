const express = require("express");
const router = express.Router();

const {
  getHospitalStock,
  adjustStock,
} = require("../controllers/stockController");

router.get("/:hospitalId", getHospitalStock);
router.post("/adjust", adjustStock);

module.exports = router;