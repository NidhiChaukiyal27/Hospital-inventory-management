const express =
  require("express");

const router =
  express.Router();

const {
  getRequisitions,
  createRequisition,
  approveRequisition,
  rejectRequisition,
} = require(
  "../controllers/requisitionController"
);

router.get(
  "/",
  getRequisitions
);

router.post(
  "/",
  createRequisition
);

router.patch(
  "/:id/approve",
  approveRequisition
);

router.patch(
  "/:id/reject",
  rejectRequisition
);

module.exports =
  router;