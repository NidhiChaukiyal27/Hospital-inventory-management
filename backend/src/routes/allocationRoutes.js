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

router.get("/", getAllocations);
router.post("/", createAllocation);
router.get("/unfulfilled",getUnfulfilledAllocations);
router.get("/:id", getAllocationById);
router.patch("/:id/confirm", confirmAllocation);


module.exports = router;