const Requisition = require("../models/Requisition");
const Hospital = require("../models/Hospital");

const getRequisitions = async (
  req,
  res,
  next
) => {
  try {
    const { status, hospital } =
      req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (hospital) {
      filter.hospital = hospital;
    }

    const requisitions =
      await Requisition.find(filter)
        .populate(
          "hospital",
          "name"
        )
        .populate(
          "items.product",
          "item_name item_code"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count:
        requisitions.length,
      requisitions,
    });
  } catch (error) {
    next(error);
  }
};

const createRequisition = async (
  req,
  res,
  next
) => {
  try {
    const {
      hospital,
      items,
    } = req.body;

    const hospitalExists =
      await Hospital.findById(
        hospital
      );

    if (!hospitalExists) {
      return res.status(404).json({
        success: false,
        message:
          "Hospital not found",
      });
    }

    const requisition =
      await Requisition.create({
        hospital,
        items,
      });

    res.status(201).json({
      success: true,
      message:
        "Requisition created successfully",
      requisition,
    });
  } catch (error) {
    next(error);
  }
};

const approveRequisition = async (
  req,
  res,
  next
) => {
  try {
    const requisition =
      await Requisition.findById(
        req.params.id
      );

    if (!requisition) {
      return res.status(404).json({
        success: false,
        message:
          "Requisition not found",
      });
    }

    requisition.items.forEach(
      (item) => {
        item.approved_quantity =
          item.quantity;
      }
    );

    requisition.status =
      "APPROVED";

    await requisition.save();

    res.status(200).json({
      success: true,
      message:
        "Requisition approved successfully",
      requisition,
    });
  } catch (error) {
    next(error);
  }
};

const rejectRequisition = async (
  req,
  res,
  next
) => {
  try {
    const requisition =
      await Requisition.findById(
        req.params.id
      );

    if (!requisition) {
      return res.status(404).json({
        success: false,
        message:
          "Requisition not found",
      });
    }

    requisition.status =
      "REJECTED";

    requisition.rejection_reason =
      req.body.reason;

    await requisition.save();

    res.status(200).json({
      success: true,
      message:
        "Requisition rejected successfully",
      requisition,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRequisitions,
  createRequisition,
  approveRequisition,
  rejectRequisition,
};