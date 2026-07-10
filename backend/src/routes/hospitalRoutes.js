const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

router.post("/", async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL HOSPITALS
router.get("/", async (req, res) => {
  try {
    const hospitals =
      await Hospital.find();

    res.status(200).json({
      success: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/", async (req, res) => {
  const hospital = await Hospital.create(req.body);

  res.status(201).json({
    success: true,
    hospital,
  });
});

module.exports = router;