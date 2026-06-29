const express = require("express");
const router = express.Router();

const {
  getAllocations,
  createAllocation,
  getAllocationById,
  confirmAllocation,
  getUnfulfilledAllocations,
} = require(
  "../controllers/allocationController"
);
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getAllocations);
router.post("/", createAllocation);
router.get("/unfulfilled",getUnfulfilledAllocations);
router.get("/:id", getAllocationById);
router.patch("/:id/confirm", confirmAllocation);
router.post(
  "/",
  protect,
  adminOnly,
  createAllocation
);
router.patch(
  "/:id/confirm",
  protect,
  adminOnly,
  confirmAllocation
);

module.exports = router;